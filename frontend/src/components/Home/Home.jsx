import { useContext } from 'react'
import './Home.css'
import { LoginContext } from '../../App'
import { useAuth } from '../../Hooks/useAuth'; // could also put this hook in a context hook and just access it within component instead of importing
import { useNavigate } from 'react-router-dom';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';
import { HomeChart } from './DonutChart/HomeChart';

export default function Home() {
    const { user, items } = useContext(LoginContext);
    const navigate = useNavigate();
    
    const isAuthorized = useAuth(); 
    //console.log(localStorage.getItem("user"))
    
    let totalItems = 0;
    if (items) { totalItems = countItems(items); }
    
    // included "&& user" so that screen is rendered when user value is ready after logging in, cause sometimes localstorage is stil being updated but the screen component renders while localstorage is being updated
    if (isAuthorized.checked && isAuthorized.completed) {
        return (
            <>
                <div id='homeContainer'>
                    <br/>
                    <br/>
                    <p>Welcome {(user) ? user : "Not Logged In"} </p>
                    <br/>
                    { (items) ? 
                    <div id='summary'>
                        <p>Total Items: {totalItems} </p>
                        <HomeChart items={items} />
                    </div> : <></>}
                </div>
            </>
        );
    }
    else if (!isAuthorized.completed) {
        return (
            <>
                <LoadingCircle />
            </>
        );
    }
    else {
        navigate('/login');
    }
}

function countItems(itemsList) {
    let sum = 0;
    
    for (let item of itemsList) {
        sum += item.ItemAmount;
    }

    return sum;
}