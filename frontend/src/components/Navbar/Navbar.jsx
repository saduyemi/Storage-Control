import { useState, useContext } from 'react'
import './Navbar.css'

import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const { user } = useContext(LoginContext);


    return (
        <>
            <div id='navbar'>
                <ul>
                    <li><p>{(user) ? user : "Null" }</p></li>
                    <li style={{overflow: 'hidden'}}><p onClick={() => navigate('/home')}>Home</p></li>
                    <li><p>Input</p></li>
                    <li><p>View</p></li>
                    <li><p>Home</p></li>
                </ul>
            </div>
        </>
    );
}