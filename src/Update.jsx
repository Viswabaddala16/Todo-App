import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from './UserReducer';

function Update() {
    const { id } = useParams();
    const users = useSelector((state) => state.users);
    const existingUser = users.find(f => f.id === parseInt(id)); // Use `find` to get the object directly
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [uname, setName] = useState('');
    const [uemail, setEmail] = useState('');

    useEffect(() => {
        if (existingUser) {
            setName(existingUser.name);
            setEmail(existingUser.email);
        }
    }, [existingUser]); // This will run when `existingUser` is set

    if (!existingUser) {
        return <h2>User not found!</h2>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({
            id: parseInt(id),
            name: uname,
            email: uemail
        }));
        navigate('/');
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>Update User</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            className='form-control' 
                            placeholder='Enter name'
                            value={uname}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            className='form-control' 
                            placeholder='Enter email'
                            value={uemail}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-info'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
