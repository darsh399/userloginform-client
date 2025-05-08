import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GreetingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome to our website</h1>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default GreetingPage;
