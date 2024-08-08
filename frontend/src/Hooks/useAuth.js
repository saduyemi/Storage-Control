import { useEffect, useState} from 'react';

// Custom hook to place at beginning of each component that requires authentication, if user is authenticated return true, otherwise return false
export function useAuth() {
    console.log("Authenticating Path....");
    const [checked, setChecked] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setCompleted(false);
                setChecked(false);
                const options = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                };
            
                const feedback = await fetch("http://localhost:3000/isvalid", options);
                const data = await feedback.json();
            
                console.log(data.message);
                if (data.message === "JWT Does Not Exist" || data.message === "Tampered") { 
                    if (localStorage.user) { localStorage.removeItem("user"); window.dispatchEvent( new Event('storage')); setChecked(false); } // Note: might have to remove dispatch over here if it's causing long loading
                    setCompleted(true);
                }
                else { 
                    console.log("User Authenticated"); console.log(data); setChecked(true); 
                    localStorage.user = data.username;
                    window.dispatchEvent( new Event('storage'));
                    setCompleted(true);
                }
            }
            catch(err) {
                setChecked(false);
                setCompleted(true);
            }
        }

        checkAuth();
    }, []); // Once a component that the hook is in renders check if user is authenticated before moving foward

    //console.log("User Authenticated"); 
    return { checked, completed};
}

// Since useState is not saved once a component is cleared, taking full control of localstorage to check if user is logged in