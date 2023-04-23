import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { reload } from 'firebase/auth';

const Home = () => {
    reload()
    const { user, logOut } = useContext(AuthContext);
    const [task, setTask] = useState([])
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if (proceed) {
            fetch(`https://next-server-omega.vercel.app/task/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = task.filter(odr => odr._id !== id);
                        setTask(remaining);
                    }
                })
        }
    }
    const handleComplete = id => {
        const proceed = window.confirm('Did you Completed this task?');
        if (proceed) {
            fetch(`https://next-server-omega.vercel.app/task/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Congratulations!');
                        const remaining = task.filter(odr => odr._id !== id);
                        setTask(remaining);
                    }
                })
        }
    }

    useEffect(() => {
        fetch(`https://next-server-omega.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setTask(data))
    }, [user?.email])





    return (
        <div>
            <div className='text-center'>
                <Link to='/'><button className='btn btn-primary my-10'>Home</button></Link>
                <Link to='/add'><button className='btn btn-primary my-10 mx-5'>Add Item</button></Link>
                {
                    user?.uid ?
                        <>
                            <Link><button className='btn btn-danger my-10 mx-5' onClick={handleLogOut}>Log Out</button></Link>
                        </> :
                        <>
                            <Link to='/logsign'><button className='btn btn-primary my-10 mx-5'>Log/Sign</button></Link>
                        </>
                }
            </div>


            <div>

                {task.length === 0 ?
                    <>
                        <h2 className='text-2xl text-center font-bold'>
                            Please Add Task/Item
                        </h2>
                        <p className='text-center text-sm'>If you add item but you don't find your data please reload the page</p>
                    </> :


                    <div>
                        <h2 className='text-2xlt text-center font-bold'>
                            Here is Your Task
                        </h2>
                        {
                            task.map(tas => <div key={tas._id} className='block  my-10 border  '>
                                <div className='flex border  gap-7 items-center justify-center'>
                                    <input type="checkbox" name="check" id="" className='h-5 w-5' />
                                    <div>
                                        <h1>{tas.title}</h1>
                                        <p>{tas.description}</p>
                                    </div>
                                    <div>
                                        <p>Date: {tas.date.slice(0, -6)}</p>
                                        <p>Time: {tas.date.slice(11,)}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <button className='btn btn-success' onClick={() => handleComplete(tas._id)}>Complete</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(tas._id)}>Delete</button>
                                    </div>
                                </div>

                            </div>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;