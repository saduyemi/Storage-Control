import { useState } from 'react'
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='email'> Email: </label>
                    <input type='email' name='email' className='emailField' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value); }} />
                    
                    <br/>
                    
                    <label htmlFor='password'> Password: </label>
                    <input type='password' name='password' className='passwordField' placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value); }} />
                    
                    <br/>
                    <button className='loginBtn'> Login </button>
                </form>
            </div>
        </>
    );
}