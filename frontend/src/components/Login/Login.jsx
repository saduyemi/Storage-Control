import { useState } from 'react'
import './Login.css'

export default function Login() {
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        
        const userInfo =  {email: userEmail, password: userPassword };
        
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfo)
        };
        
        let data;
        
        try {
            const response = await fetch("http://localhost:3000/login", options);
            data = await response.json();
            console.log(data);
        }
        catch(err) {
            console.log(err);
        }
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