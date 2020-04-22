import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Register = (props) => {

    const { setAlert } = useContext(AlertContext);
    const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        if (isAuthenticated) {

            props.history.push('/');
        }
        if (error === 'user already exists ') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);
    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Password do not match', 'danger')
        } else {
            register({
                name, email, password
            })
        }
        console.log('register user');
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} id="" required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} id="" required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} id="" minLength="6" required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} id="" minLength="6" required onChange={onChange} />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}


export default Register;