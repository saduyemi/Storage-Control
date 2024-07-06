import { useState, useContext } from 'react'
import './Catalog.css'

import { LoginContext } from '../../App';
import { useAuth } from '../../Hooks/useAuth';

export default function Catalog() {
    const isAuthorized = useAuth();

    const { items } = useContext(LoginContext);
    if (items) console.log("In Catalog: ", items);

    if (isAuthorized && items) {
        return (
            <>
                <p style={{textAlign: 'center'}}>Implement Catalog</p>
                <div id='itemsContainter'>
                    <ul>
                        {items.map((anItem) => (
                            <li key={anItem.ItemID}>
                                <div className='items'>
                                    <button>D</button>
                                    <button>E</button>
                                    <img src={anItem.ItemPicture} />
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
    }

    else {
        return (
            <>
                <p>Loading....</p>
            </>
        );
    }
}