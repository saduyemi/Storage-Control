import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom';


async function isAuthenticated() {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    };

    const feedback = await fetch("http://localhost:3000/isvalid", options);
    const data = await feedback.json();

    console.log(data.message);
    if (data.message === "JWT Does Not Exist" || data.message === "Tampered") { localStorage.removeItem("user"); return false; }
    else { return true; }
}

// Custom hook to place at beginning of each component that requires authentication, if user is authenticated return true, otherwise return false
export function useAuth() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const { user } = useContext(LoginContext);
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const options = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                };
            
                const feedback = await fetch("http://localhost:3000/isvalid", options);
                const data = await feedback.json();
            
                console.log(data.message);
                if (data.message === "JWT Does Not Exist" || data.message === "Tampered") { 
                    if (localStorage.user) { localStorage.removeItem("user"); } 
                    navigate('/login'); 
                }
                else { setChecked(true); }
            }
            catch(err) {
                navigate('/login');
            }
        }

        // quick check to see if user is there, don't use this it depends on localStorage and data in localStorage doesn't expire
        //if (!user) { navigate('/login'); }
        //else { setChecked(true); }

        checkAuth();
    }, []); // Once a component that the hook is in renders check if user is authenticated before moving foward

    console.log("User Authenticated"); 
    return checked;
}