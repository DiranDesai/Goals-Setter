import React, { useContext, useState } from 'react'
import { globalContext } from "../context/GlobalState";

function Signup() {
    const { register, start_registering } = useContext(globalContext);


    const [formInputs, setFormInputs] = useState({username: "", email: "", password: ""});

    function handleInputChanges(e) {
        setFormInputs(prev => {
            return {...prev, [e.target.name]: e.target.value};
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await register(formInputs);
        setFormInputs({username: "", email: "", password: ""});
    }


  return (
    <div className='signup card-form'>
        <div className='signup-form'>
            <h1 className='header'>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={e => handleInputChanges(e)} name="username" className="form-control" value={formInputs.username} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={e => handleInputChanges(e)} name="email" className="form-control" value={formInputs.email} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={e => handleInputChanges(e)} name="password" className="form-control" value={formInputs.password} />
                </div>
                <br />
                <input type="submit" className='btn btn-primary' value="Signup" />
            </form>
        </div>
    </div>
  )
}

export default Signup