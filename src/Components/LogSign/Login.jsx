import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';


const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const [err, setErr] = useState('');
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(error => setErr(error.message))

    }
    return (
        <div className=" my-20">
            <div className="card w-full md:w-96 lg:w-96 mx-auto  shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl text-center font-bold">Login </h1>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href=" " className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div>
                        {err && <p className='text-red-500 border p-4 border-red-600 border-spacing-2'>{err}</p>}
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value="Log in" />
                    </div>
                </form>
                <p className='text-center'>New to Genius Car?  <Link to="/signup" className='text-orange-700 underline font-bold'>Sign Up</Link></p>
            </div>
        </div >
    );
};

export default Login;