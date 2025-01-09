import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import  Heading  from "../components/common/Heading";
import  Card  from "../components/common/Card"
import SubHeading from "../components/common/SubHeading";

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, email } = useAuth();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const todoToken = localStorage.getItem("todoToken");
                const response = await axios.get("http://localhost:3000/api/todos",
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': todoToken
                        }
                    }
                );
                if (response.data) {
                    setMessage({ success: true, value: 'todo fetch successfull' });
                    setTodos(response.data);
                } else {
                    setMessage({ success: false, value: response.data.message });
                }
            } catch (error) {
                setMessage({ success: false, value: error.message });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [deleteModal]);

    const handleDelete = (id) => {
        setDeleteModal({ isOpen: true, id: id });
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const todoToken = localStorage.getItem("todoToken");
            const response = await axios.delete(`http://localhost:3000/api/todos/${deleteModal.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': todoToken
                }
            });
            if (response.data.success) {
                setMessage({ success: true, value: 'Todo deleted successfully' });
                setTodos(todos.filter(todo => todo._id !== deleteModal.id));
            } else {
                setMessage({ success: false, value: response.data.message });
            }
        } catch (error) {
            setMessage({ success: false, value: error.message });
        } finally {
            setDeleteModal({ isOpen: false, id: null });
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ isOpen: false, id: null });
    };

    return (
        <div className={`p-4 ${theme === 'dark' ? 'bg-[var(--bg-dark)] text-[var(--text-dark)]' : 'bg-[var(--bg-light)] text-[var(--text-light)]'}`}>
            <div className="max-w-5xl mx-auto">
                <Heading>Dashboard</Heading>
                {loading && <p className="text-center my-4">Loading...</p>}
                {todos && todos.length > 0 ? (
                    <div className="flex flex-wrap gap-8 justify-center mt-6">
                        {todos.map(({ _id, title, category, priority, dueDate, status }) => (
                            <Card key={_id} className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}>
                                <Heading>{title}</Heading>
                                <SubHeading>{category}</SubHeading>
                                <p>Priority: <span className={`font-medium ${priority === 'high' ? 'text-red-500' : priority === 'normal' ? 'text-yellow-500' : 'text-green-500'}`}>{priority}</span></p>
                                <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                                <p>Status: <span className={`font-medium ${status === 'pending' ? 'text-yellow-500' : status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{status}</span></p>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => navigate(`/edit/${_id}`)} className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Edit</button>
                                    <button onClick={() => handleDelete(_id)} className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600">Delete</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="text-center mt-4">No todos found.</p>
                )}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this todo?</p>
                            <div className="flex justify-end gap-4">
                                <button onClick={cancelDelete} className="bg-gray-400 text-white rounded-md p-2 hover:bg-gray-500">Cancel</button>
                                <button onClick={confirmDelete} className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
