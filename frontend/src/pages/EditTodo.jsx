import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import  Input  from '../components/common/Input';
import Button from '../components/common/Button';

function EditTodo() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);
    const { todoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoading(true);
                const todoToken = localStorage.getItem("todoToken");
                const response = await axios.get(`http://localhost:3000/api/todos/${todoId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': todoToken
                    }
                });
                if (response.data) {
                    setTitle(response.data.title);
                    setCategory(response.data.category);
                    setPriority(response.data.priority);
                    setDueDate(new Date(response.data.dueDate).toISOString().split('T')[0]);
                    setStatus(response.data.status);
                } else {
                    setMessage({ success: false, value: response.data.message });
                }
            } catch (error) {
                setMessage({ success: false, value: error.message });
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [todoId]);

    const handleEditTodo = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const todoToken = localStorage.getItem("todoToken");
            const response = await axios.put(`http://localhost:3000/api/todos/${todoId}`,
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

            if (response.data.message) {
                setMessage({ success: true, value: 'todo updated successfully!' });
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
        <div className="bg-[var(--bg-light)] p-4">
            <div className="max-w-md mx-auto">
            <form onSubmit={handleEditTodo} className="flex flex-col p-2 gap-3">
                <label htmlFor="title" className="text-[var(--text-light)]">title</label>
                <Input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />

                <label htmlFor="category" className="text-[var(--text-light)]">category</label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category} className="input">
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>

                <label htmlFor="priority" className="text-[var(--text-light)]">priority</label>
                <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} value={priority} className="input">
                    <option value="high">high</option>
                    <option value="normal">normal</option>
                    <option value="low">low</option>
                </select>

                <label htmlFor="dueDate" className="text-[var(--text-light)]">dueDate</label>
                <input type="date" name="dueDate" onChange={(e) => { setDueDate(e.target.value) }} value={dueDate} className="input" />

                <label htmlFor="status" className="text-[var(--text-light)]">status</label>
                <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status} className="input">
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                </select>

                <Button type="submit" className="bg-[var(--primary-color)]">{loading ? "loading..." : "update todo"}</Button>
            </form>
            {message && <p className={message.success ? "text-green-500" : "text-red-500"}> {message.value}</p>}

            </div>
         </div>
    );
}

export default EditTodo;
