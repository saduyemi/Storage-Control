import { useState, useEffect } from 'react';

function getUser() {
    if (!localStorage.user) { return null; } // no need for logging statements it doesn't work if it's on same page, but the even handler still works though
    const text = localStorage.getItem('user');
    //const obj = (text) ? JSON.parse(text) : null; // have to put in tenary in order for parse to work (in TS) and this should be used with objects so far the text variable is just a string so this is not needed
    return text;
}

export function useProfile() {
    const [profile, setProfile] = useState(getUser());

    useEffect(() => {
        function handleChangeStorage() {
            setProfile(getUser());
        }

        window.addEventListener('storage', handleChangeStorage); // function is called whenever something happens in storage
        
        return () => window.removeEventListener('storage', handleChangeStorage); // After program is done, remove eventlistener on storage, return statement is just a cleanup function to prevent leaks
    }, []);

    return profile;
}