import { useState, useContext } from 'react'
import './Login.css'
import { LoginContext } from '../../App'
import { useNavigate } from 'react-router-dom';
import loginPicture from '../../images/nopic.jpg'

export default function Login() {
    const { user } = useContext(LoginContext);

    const [userEmail, setEmail] = useState("Enter Email");
    const [userPassword, setPassword] = useState("Enter Password");

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
            console.log("Logging In", data);

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

    function handleEmail(e) {
        if (e.target.value === "") {
            setEmail("Enter Email");
        } else {
            setEmail(e.target.value);
        }
    }

    function handlePassword(e) {
        if (e.target.value === "") {
            setPassword("Enter Password");
        } else {
            setPassword(e.target.value);
        }
    }

    return (
        <> 
            <div className='loginContainer'>
                <div className='loginPicture'>
                    <img src={loginPicture} />
                </div>
                <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                    <div className='loginFlex'>
                    <p id='welcome'>Welcome!</p>
                    <input type='email' id='email' className='emailField' placeholder={userEmail}  onChange={(e) => { handleEmail(e); }} autoComplete='on'/>                    
                    <input type='password' id='password' className='passwordField' placeholder='Enter Password' onChange={(e) => { handlePassword(e); }} /> 

                    <button className='loginBtn'> Login </button>
                    <p style={{margin: "4rem 0% 1rem 0%", display: 'inline-block'}} >Don't have an account?&nbsp;</p> 
                    <p className='signBtn' onClick={ () => navigate('/signup')} >Create Account</p> 
                    </div>
                </form>
            </div>
        </>
    );
}