import { useState, useEffect, useContext } from 'react'
import './Navbar.css'

import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faKeyboard, faMagnifyingGlass, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    
    const navigate = useNavigate();
    const [ username, setUsername] = useState(null);

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

    useEffect(() => {
        if (user) { 
            let name = localStorage.getItem('user');
            setUsername(name.split('@')[0]); 
        }
    }, []);
    
    return (
        <>
            <div id='navbar'>
                <ul>
                    <li><FontAwesomeIcon icon={faUser} className='icons' /><p>{(username) ? username : "Null" }</p></li>
                    <li onClick={() => navigate('/home')}><FontAwesomeIcon icon={faHouse} style={{color: "#606467", }} /> <p>Home</p></li>
                    <li onClick={() => navigate('/input')}><FontAwesomeIcon icon={faKeyboard} className='icons' /><p>Input</p></li>
                    <li onClick={() => navigate('/catalog')}><FontAwesomeIcon icon={faMagnifyingGlass} className='icons'/><p>View</p></li>
                    <li style={{marginTop: '25rem'}} onClick={() => { logout(); }}><FontAwesomeIcon icon={faArrowRightFromBracket} className='icons'/><p>Sign Out</p></li>
                </ul>
            </div>
        </>
    );
}