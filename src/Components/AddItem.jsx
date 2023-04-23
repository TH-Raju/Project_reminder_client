import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const AddItem = () => {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const { user, logOut } = useContext(AuthContext);
    const handleDateTimeChange = (event) => {
        setSelectedDateTime(event.target.value);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const handleData = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;


        const data = {
            name,
            email,
            title,
            description,
            date
        }
        console.log(data);

        fetch('https://next-server-omega.vercel.app/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Remainder added successfully')
                    form.reset();
                }
            })
            .catch(er => console.log(er));
    }



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

                <form className="my-10" onSubmit={handleData}>
                    <h2 className="text-4xl text-center my-10">Add Your Reminder</h2>
                    <span className="mb-1">Name</span>
                    <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full" />
                    <span className="mb-1">Email</span>
                    <input name="email" type="email" value={user.email} className="input input-bordered w-full" />
                    <span className="mb-1">Title</span>
                    <input name="title" type="text" placeholder="Reminder Title" className="input input-bordered w-full" />
                    <span className="mb-1"> Description</span>
                    {/* <input className="input input-bordered w-full" /> */}
                    <textarea name="description" type="text" placeholder="Describe about your task" required className="textarea textarea-bordered w-full h-28" ></textarea> <br />
                    <span>Date/Time</span> <br />
                    <input type="datetime-local" name="date" disabled defaultValue={selectedDateTime.toISOString().slice(0, -8)} onChange={handleDateTimeChange} className='text-xl font-bold' />



                    <input type="submit" className='btn w-full btn-primary text-white border     hover:border-none my-8' value="Add Item" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;