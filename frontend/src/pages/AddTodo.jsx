import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  Input  from '../components/common/Input';
import Button from '../components/common/Button';

function AddTodo() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('normal');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('pending');
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAddTodo = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const todoToken = localStorage.getItem("todoToken");
            const response = await axios.post("http://localhost:3000/api/todos",
                {
                    title: title,
                    category: category,
                    priority: priority,
                    dueDate: dueDate,
                    status: status
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": todoToken
                    }
                }
            );

            if (response.data.success) {
                setMessage({ success: true, value: 'todo created successfully!' });
                navigate("/");
            } else {
                setMessage({ success: false, value: response.data.message });
            }
        } catch (error) {
            setMessage({ success: false, value: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background p-4">
            <div className="max-w-md mx-auto">
                <form onSubmit={handleAddTodo} className="flex flex-col p-2 gap-3">
                    <label htmlFor="title" className="text-text">title</label>
                    <Input type="text" name="title" placeholder='add your todo here' onChange={(e) => setTitle(e.target.value)} value={title} />

                    <label htmlFor="category" className="text-text">category</label>
                    <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category} className="input">
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>

                    <label htmlFor="priority" className="text-text">priority</label>
                    <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} value={priority} className="input">
                        <option value="high">high</option>
                        <option value="normal">normal</option>
                        <option value="low">low</option>
                    </select>

                    <label htmlFor="dueDate" className="text-text">dueDate</label>
                    <input type="date" name="dueDate" onChange={(e) => { setDueDate(e.target.value) }} value={dueDate} className="input" />

                    <label htmlFor="status" className="text-text">status</label>
                    <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status} className="input">
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                    </select>

                    <Button type="submit" className="bg-[var(--primary-color)]">{loading ? "loading..." : "add todo"}</Button>
                </form>
                {message && <p className={message.success ? "text-green-500" : "text-red-500"}> {message.value}</p>}
            </div>
        </div>
    );
}

export default AddTodo;
