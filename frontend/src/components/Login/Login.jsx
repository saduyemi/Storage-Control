import { useState, useContext } from 'react'
import './Login.css'
import { LoginContext } from '../../App'

import { useNavigate } from 'react-router-dom';


export default function Login() {
    //const {user, setUser} = useContext(LoginContext);

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        
        const userInfo =  {email: userEmail, password: userPassword };
        
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json",
                    // "Access-Control-Allow-Credentials": true <- works without this because credentials property below
                    },
            credentials: "include",
            body: JSON.stringify(userInfo)
        };
        
        let data;
        
        try {
            const response = await fetch("http://localhost:3000/login", options);
            data = await response.json();
            console.log(data);

            localStorage.user = data.userEmail;
            window.dispatchEvent( new Event('storage')); // include this so useProfile hook knows to change user based adding new value to user on current tab

            navigate("/home");
        }
        catch(err) {
            if (localStorage.user) { localStorage.removeItem(user); window.dispatchEvent( new Event('storage'));}
            console.log(err);
            navigate("/login");
        }
    }

    return (
        <>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='email'> Email: </label>
                    <input type='email' id='email' className='emailField' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value); }} autoComplete='on'/>
                    
                    <br/>
                    
                    <label htmlFor='password'> Password: </label>
                    <input type='password' id='password' className='passwordField' placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value); }} />
                    
                    <br/>
                    <button className='loginBtn'> Login </button>
                </form>
            </div>
        </>
    );
}