import { useState, useReducer } from 'react'
import './Signup.css'
import { isEmail } from 'validator'
import { useNavigate } from 'react-router-dom';

const userTemplate = {
    email: "",
    password: "",

    emailError: false,
    passwordError: false
};

function signupReducer(state, action) {
    switch (action.type) {
        case "email_change":
            if (isEmail(action.value)) { // useful when user first submits and gets error cause it's not a valid email, this will remove the error message once it's valid again
                return {...state, email: action.value, emailError: false};
            } 
            return {...state, email: action.value};

        case "email_error":
            return {...state, emailError: action.value};

        case "password_change":
            if ((action.value).length >= 7) {
                return {...state, password: action.value, passwordError: false};
            }
            return {...state, password: action.value};
        
        case "password_error":
            return {...state, passwordError: action.value};
    
        default:
            return state;
    }
}
export default function Signup() {
    const [user, dispatch] = useReducer(signupReducer, userTemplate);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Creating New User:", user);
        
        if (!isEmail(user.email)) { 
            alert("Invalid Email"); 
            dispatch({type: "email_error", value: true});
        }
        if (user.password < 7) { 
            alert("Password Must Be Greater T");
            dispatch({type: "password_error",  value: true});
        }

        if (user.emailError || user.passwordError) { return; }

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email: user.email, password: user.password})
        }

        try {
            const feed = await fetch('http://localhost:3000/create_user', options);
            const feedback = await feed.json();
            console.log(feedback);

            if (!localStorage.getItem('user')) { 
                localStorage.user = user.email; 
            } else {
             localStorage.setItem('user', user.email);
            }
            
            window.dispatchEvent( new Event('storage'));
            navigate('/home');
        }
        catch (err) {
            console.log(err);
            navigate('/signup');
        }

        return;
    }

    return (
        <>
            <div className='signContainer'>
                <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='email'> Email: </label>
                    <input type='email' id='email' className='newEmailField' placeholder='Enter Email' onChange={(e) => { dispatch({type: "email_change", value: e.target.value}); }} autoComplete='on'/>
                    {(user.emailError) ? <p className='errors'>Invalid Email</p> : <></>}
                    <br/>
                    
                    <label htmlFor='password'> Password: </label>
                    <input type='password' id='password' className='newPasswordField' placeholder='Enter Password' onChange={(e) => { dispatch({type: "password_change", value: e.target.value}); }} />
                    {(user.passwordError) ? <p className='errors'>Password Must Be Atleast 7 Characters</p> : <></>}
                    <br/>

                    <button id='createBtn'> Create </button>

                </form>
            </div>
        </>
    );
}