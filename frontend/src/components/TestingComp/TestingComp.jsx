import { useState, useEffect, useContext } from 'react'
import './Home.css'
import { LoginContext } from '../../App'
import { useAuth } from '../../Hooks/useAuth'; // could also put this hook in a context hook and just access it within component instead of importing
import { useNavigate } from 'react-router-dom';


async function getItems() {
    
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    };

    const feedback = await fetch("http://localhost:3000/items", options);
    const data = await feedback.json();

    console.log(data);
}

async function checkAuth() {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json",
                // "Access-Control-Allow-Credentials": true <- works without this because credentials property below
                },
        credentials: "include",
    };

    const feedback = await fetch("http://localhost:3000/isvalid", options);
    const data = await feedback.json();

    console.log(data.message);
    if (data.message === "JWT Does Not Exist" || data.message === "Tampered") { localStorage.removeItem("user"); }
}

async function logout() {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    };

    const feedback = await fetch('http://localhost:3000/logout', options);
    const js = await feedback.json();

    //if (localStorage.user) { localStorage.removeItem("user"); } 
    console.log(js);
}

export default function Home() {
    const { user } = useContext(LoginContext);
    const navigate = useNavigate();
    
    const isAuthorized = useAuth();

    // included "&& user" so that screen is rendered when user value is ready after logging in, cause sometimes localstorage is stil being updated but the screen component renders while localstorage is being updated
    if (isAuthorized && user) {
        return (
            <>
                <br/>
                <p>Implement Home</p>
                <br/>
                <p>Welcome {(user) ? user : "Not Logged In"} </p>
                <br/>

                <button onClick={(e) => { checkAuth(); }}>Checker</button>
                <button onClick={(e) => { getItems(); }}>Items</button>
                <button onClick={(e) => { logout(); navigate('/login'); }}>Sign Out</button>
            </>
        );
    }
    else {
        return (
            <>
                <p>Loading.......</p>
            </>
        );
    }
}

