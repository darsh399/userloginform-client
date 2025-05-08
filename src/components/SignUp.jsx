import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';


const SignUp = () => {
    const [signUpFormData, setSignUpFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    });

    const navigate = useNavigate();

    const inputHandler = (e) => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    };

    const showPasswordHandler = () => {
        setSignUpFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if (signUpFormData.password === '' || signUpFormData.email === '') {
            console.log('input fields cannot be empty');
            alert('input fields cannot be empty...');
            return;
        }

        if (!validateEmail(signUpFormData.email)) {
            console.log('Invalid email format');
            alert('Please enter a valid email address');
            return;
        }

        if (!validatePassword(signUpFormData.password)) {
            console.log('Password is too weak');
            alert('Password must contain at least 8 characters');
            return;
        }

        if (signUpFormData.password !== signUpFormData.confirmPassword) {
            console.log('password not matched...');
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/addUser', {
                email: signUpFormData.email,
                password: signUpFormData.password
            });

            if (response) {
                navigate('/login')
                console.log(`data fetched successfully...`, response.data);
            }



        } catch (error) {
            console.log(`error in fetching data`);
        }
        setSignUpFormData({
            email: '',
        password: '',
        confirmPassword: ''
        })
    };

    return (
        <form className="signup-form" onSubmit={formSubmitHandler}>
            <h1 className="signup-title">Sign Up Form</h1>

            <input
                className="signup-input"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={signUpFormData.email}
                onChange={inputHandler}
            />

            <input
                className="signup-input"
                type={signUpFormData.showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="password"
                value={signUpFormData.password}
                onChange={inputHandler}
            />

            <input
                className="signup-input"
                type={signUpFormData.showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signUpFormData.confirmPassword}
                onChange={inputHandler}
            />

            <div className="signup-checkbox-container">
                <input
                    className="signup-checkbox"
                    type="checkbox"
                    onClick={showPasswordHandler}
                />
                <label className="signup-label">Show password</label>
            </div>

            <button className="signup-button" type="submit">Register</button>

            <p className="signup-login-link">
                Already a user? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};

export default SignUp;
