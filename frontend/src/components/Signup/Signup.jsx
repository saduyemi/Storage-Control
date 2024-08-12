import { useState, useReducer } from 'react'
import './Signup.css'
import { isEmail } from 'validator'
import { useNavigate } from 'react-router-dom';

const userTemplate = {
    email: "Enter New Email",
    password: "Enter New Password",

    emailMessage: "",

    emailError: false,
    passwordError: false
};

function signupReducer(state, action) {
    switch (action.type) {
        case "email_change":
            return {...state, email: action.value, emailError: false};
        
        case "email_error":
            return {...state, emailError: action.value, emailMessage: action.message};

        case "password_change":
            return {...state, password: action.value, passwordError: false};
            
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
        
        if (!isEmail(user.email)) { 
            //kalert("Invalid Email"); 
            dispatch({type: "email_error", value: true});
        }
        if (user.password.length < 7) { 
            //kalert("Password Must Be Greater T");
            dispatch({type: "password_error",  value: true});
        }

        if (user.emailError || user.passwordError) { return; }
        
        console.log("Creating New User:", user); 

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email: user.email, password: user.password})
        }

        try {
            const feed = await fetch('http://localhost:3000/create_user', options);
            if (feed.status >= 400) { console.log(">400"); throw new Error("Duplicate Value"); }

            const feedback = await feed.json();
            console.log("Here", feedback);

            if (!localStorage.getItem('user')) { 
                localStorage.user = user.email; 
            } else {
             localStorage.setItem('user', user.email);
            }
            
            window.dispatchEvent( new Event('storage'));
            navigate('/home');
        }
        catch (err) {
            if (err.message === "Duplicate Value") {
                dispatch({type: "email_error", value: true, message: "Duplicate Email"});
                return;
            }

            console.log(err);
            dispatch({type: "email_error", value: true, message: "Server Down"});
        }
    }

    return (
        <>
            <div className='signContainer'>
                <form className='signForm' onSubmit={(e) => handleSubmit(e)}>
                    <p id='createText'>Create An Account</p>
                    
                    <input type='email' id='email' className='newEmailField' placeholder='Enter Email' onChange={(e) => { dispatch({type: "email_change", value: e.target.value}); }} autoComplete='on'/>
                    {(user.emailError) ? <p className='errors'>{user.emailMessage}</p> : <></>}
                    
                    <input type='password' id='password' className='newPasswordField' placeholder='Enter Password' onChange={(e) => { dispatch({type: "password_change", value: e.target.value}); }} />
                    {(user.passwordError) ? <p className='errors'>Password Must Be Atleast 7 Characters</p> : <></>}

                    <button id='createBtn'> Create </button>
                </form>
            </div>
        </>
    );
}