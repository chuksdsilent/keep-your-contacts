import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alert/AlertContext'

const Login = (props) => {

    const { setAlert } = useContext(AlertContext);
    const { login, error, clearErrors, isAuthenticated, loading } = useContext(AuthContext);



    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        } else if (error === 'Minimum characterr required is 6') {
            setAlert(error, 'danger');
            clearErrors();
        } else if (error === 'Incorrect Credentials') {
            setAlert(error, 'danger');
            clearErrors();

        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onLoginSubmit = e => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert('Please Fill in all fields', 'danger');
        } else {
            login({
                email, password
            });
        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} id="" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} id="" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">{loading ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
}


export default Login;