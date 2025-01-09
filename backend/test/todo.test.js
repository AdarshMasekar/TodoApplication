const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../src/models/User');
const Todo = require('../src/models/Todo');
const { hash } = require('../src/utils/auth');

let mongoServer;
let user;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a test user
    const hashedPassword = await hash('Test@123');
    user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
    });

    // Login the user to get a token
    const response = await request(app)
        .post('/api/user/signin')
        .send({
            email: 'test@example.com',
            password: 'Test@123',
        });
    token = response.body.message;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Todo API Endpoints', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .send({
                username: 'newuser',
                email: 'new@example.com',
                password: 'New@123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('user registration successfull!');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/user/signin')
            .send({
                email: 'test@example.com',
                password: 'Test@123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo',
                category: 'Work',
                priority: 'high',
                dueDate: new Date(),
                status: 'pending',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('todo created successfully!');
    });

    it('should get all todos for a user', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a specific todo', async () => {
        const createResponse = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo 2',
                category: 'Personal',
                priority: 'normal',
                dueDate: new Date(),
                status: 'pending',
            });
        const todoId = createResponse.body.message;
        const response = await request(app)
            .get(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title');
        expect(response.body.title).toBe('Test Todo 2');
    });

    it('should update a todo', async () => {
        const createResponse = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo 3',
                category: 'Other',
                priority: 'low',
                dueDate: new Date(),
                status: 'pending',
            });
        const todoId = createResponse.body.message;
        const response = await request(app)
            .put(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Todo',
                category: 'Other',
                priority: 'low',
                dueDate: new Date(),
                status: 'completed',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('todo updated successfully!');
    });

    it('should update a todo status', async () => {
        const createResponse = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo 4',
                category: 'Personal',
                priority: 'normal',
                dueDate: new Date(),
                status: 'pending',
            });
        const todoId = createResponse.body.message;
        const response = await request(app)
            .put(`/api/todos/status/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'completed',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('todo updated successfully!');
    });

    it('should delete a todo', async () => {
        const createResponse = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo 5',
                category: 'Work',
                priority: 'high',
                dueDate: new Date(),
                status: 'pending',
            });
        const todoId = createResponse.body.message;
        const response = await request(app)
            .delete(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('todo deleted successfully!');
    });
});
