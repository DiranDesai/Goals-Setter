import React, {useState, useContext} from 'react'
import { globalContext } from "../context/GlobalState"; 
import '../App.css';

function Login() {
    const { login, start_logging } = useContext(globalContext);


    const [formInputs, setFormInputs] = useState({email: "", password: ""});

    function handleInputChanges(e) {
        setFormInputs(prev => {
            return {...prev, [e.target.name]: e.target.value};
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await login(formInputs);
        setFormInputs({email: "", password: ""});
    }

  return (
    <div className='login card-form'>
        <div className='login-form'>
            <h1 className='header'>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={e => handleInputChanges(e)} className="form-control" value={formInputs.email} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={e => handleInputChanges(e)} className="form-control" value={formInputs.password}  />
                </div>
                <br />
                <input type="submit" className='btn btn-primary' value="Login" />
            </form>
        </div>
    </div>
  )
}

export default Login