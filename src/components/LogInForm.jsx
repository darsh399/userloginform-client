import { useState } from "react";
import './LogInForm.css';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const LogInForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false
    });

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            if (formData.email === '' || formData.password === '') {
                alert('Input fields cannot be empty...');
                return;
            }
    
            const response = await axios.post('https://userloginform-server.onrender.com/api/v1/user/login', {
                email: formData.email,
                password: formData.password
            });
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/greet');
            }
        } catch (error) {
            console.log('Error logging in user', error.response?.data?.message || error.message);
        }
    };
    

    const showPasswordHandler = () => {
        setFormData(prev => ({
            ...prev,
            showPassword: !prev.showPassword
        }));
    };

    return (
        <form className="login-form" onSubmit={submitHandler}>
            <h1 className="loginup-title">Log In Form</h1>
            <input
                className="form-input"
                type="text"
                placeholder="Enter Email"
                value={formData.email}
                name='email'
                onChange={inputHandler}
            />
            <input
                className="form-input"
                type={formData.showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={formData.password}
                name='password'
                onChange={inputHandler}
            />
            <div className="checkbox-container">
                <input
                    className="form-checkbox"
                    type="checkbox"
                    id="showPassword"
                    onClick={showPasswordHandler}
                />
                <label className="form-label" htmlFor="showPassword">Show password</label>
            </div>
            <button className="submit-button" type="submit">SUBMIT</button>
            <p className="login-link">
                Already a user? <Link to="/">Sign Up</Link>
            </p>
        </form>
    );
};

export default LogInForm;
