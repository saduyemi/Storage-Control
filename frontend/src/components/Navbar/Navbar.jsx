import { useState, useContext } from 'react'
import './Navbar.css'

import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const { user } = useContext(LoginContext);

    async function logout() {
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        };
    
        const feedback = await fetch('http://localhost:3000/logout', options);
        const js = await feedback.json();
    
        if (localStorage.user) { localStorage.removeItem("user"); } 
        window.dispatchEvent( new Event('storage')); // include this so useProfile hook knows to change user based adding change to user in localstorage because of current tab

        console.log(js);
        navigate('/login');
    }

    return (
        <>
            <div id='navbar'>
                <ul>
                    <li><p>{(user) ? user : "Null" }</p></li>
                    <li><p onClick={() => navigate('/home')}>Home</p></li>
                    <li><p onClick={() => navigate('/input')}>Input</p></li>
                    <li><p onClick={() => navigate('/catalog')}>View</p></li>
                    <li onClick={() => { logout(); }}><p>Sign Out</p></li>
                </ul>
            </div>
        </>
    );
}