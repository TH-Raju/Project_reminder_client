import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                navigate('/')
                console.log(user);
            })
            .catch(err => setLoginError(err.message))

    }

    return (
        <div className="  my-20">
            <div className="card w-full md:w-96 lg:w-96 mx-auto  shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl text-center font-bold">Sign Up </h1>
                <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value="Sign Up" />
                    </div>
                </form>
                <p className='text-center'>Already have an account?  <Link to="/logsign" className='text-orange-700 underline font-bold'>Log in</Link></p>
            </div>
        </div >
    );
};

export default SignUp;