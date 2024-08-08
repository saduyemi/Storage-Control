import { useState, useContext } from 'react'
import './Catalog.css'
import defaultPicture from '../../images/nopic.jpg'
import { LoginContext } from '../../App';
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Edit from './EditModal/Edit';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

export default function Catalog() {
    const [isModal, setModal] = useState(false);
    const [aItem, setItem] = useState({});
    const navigate = useNavigate();

    const isAuthorized = useAuth();

    if (isAuthorized.completed) {
        if (isAuthorized.checked) {
            const { items, refreshItems } = useContext(LoginContext);
            //if (items) console.log("In Catalog: ", items);

            let displayModal = (isModal && aItem) ? <Edit item={aItem} closeThis={() => {setModal(false); setItem({}); }} resfresh={refreshItems}/> : <></>;
            async function deleteItem(itemID) {
                try {
                    const data = { id: itemID };

                    const options = {
                        method: "DELETE",
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(data)
                    };

                    const feedback = await fetch('http://localhost:3000/delete_item', options);
                    const feed = feedback.json();
                    console.log(feed);
                    refreshItems();
                }
                catch(err) {
                    console.log(err);
                }
            }

            if (items) {
                return (
                    <>
                        {displayModal}
                        <div id='itemsContainter'>
                            <ul>
                                {items.map((anItem) => (
                                    <li key={anItem.ItemID}>
                                        <div className='items'>
                                            <button style={{marginLeft: '45%'}} onClick={() => { deleteItem(anItem.ItemID)}} >D</button>
                                            <button style={{marginLeft: '15%'}} onClick={() => {setItem({...anItem}); setModal(true); }}>E</button>
                                            <img src={(anItem.ItemPicture) ? anItem.ItemPicture : defaultPicture} />
                                            <p>{anItem.ItemName}</p>
                                            <p>{`Amount: ${anItem.ItemAmount} `}</p>
                                            <p>{`Category: ${anItem.ItemCategory} `}</p>
                                            <p>{`Price: $${anItem.ItemPrice} `}</p>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div style={{marginLeft: '15%', paddingTop: '15rem'}}>
                        <p style={{textAlign: 'center'}}>Empty Storage</p>  
                        </div>
                    </>
                );
            }        
        } else {
            navigate('/login');
        }
    }
    else {
        return ( <LoadingCircle/> );
    }
}