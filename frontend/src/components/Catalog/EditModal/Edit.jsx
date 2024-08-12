import { useState, useReducer } from 'react';
import './Edit.css';
import defaultPicture from '../../../images/nopic.jpg'
import Resizer from 'react-image-file-resizer';

function editReducer(state, action) {
    switch(action.type) {
        case 'name_change':
            return {...state, name: action.value};

        case 'amount_change':
            return {...state, amount: action.value};

        case 'category_change':
            return {...state, category: action.value};

        case 'price_change':
            return {...state, price: action.value};

        case 'file_change':
            return {...state, file: action.value};

    }

}

async function resizeFile(file, fileType) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(file, 100, 100, fileType, 100, 0, uri => { resolve(uri)}, 'base64');
    });
}

export default function Edit({item, closeThis, resfresh}) {
    const itemTemp = {
        name: item.ItemName,
        amount: item.ItemAmount,
        category: item.ItemCategory,
        price: item.ItemPrice,
        file: item.ItemPicture
    }
    
    const [state, dispatch] = useReducer(editReducer, itemTemp);
    const [imageURL, setURL] = useState(item.ItemPicture);

    async function preview(file) {
        try {
            let fileType = (file.type).split('/')[1]; fileType = fileType.toUpperCase(); console.log("Type", fileType);
            const resized = await resizeFile(file, fileType);
            setURL(resized);    
        }
        catch(err) {
            console.log(err);
        }
    }

    async function handleFile(file) {
        try {
            let fileType = (file.type).split('/')[1]; fileType = fileType.toUpperCase(); console.log("Type", fileType);
            const resized = await resizeFile(file, fileType);
            return resized;
        }
        catch (err) {
            throw(err);
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(state);
        if (!state.name) { return; }

        const shortenedURL = await handleFile(state.file);
        
        try {
            const data = {
                itemID: item.ItemID,
                name: state.name,
                amount: state.amount,
                category: state.category,
                price: state.price,
                picture: shortenedURL,
            };

            const options = {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            };

            console.log("Sending This", data)
            const feed = await fetch('http://localhost:3000/update_item', options);
            const feedback = await feed.json();

            console.log(feedback); //console.log(feedback.feedback.picture);
            resfresh();
            closeThis();

        }
        catch (err) {
            console.log("Error In Edit Component");
            closeThis();
        }
        
        
    }

    return (
        <>
            <div className='modal'>
                <div className='modal-content'>
                    <form className='modal-form' >
                        <button className='closeBtn' onClick={(e) => { e.preventDefault(); closeThis(); }}>&times;</button>
                        <br style={{marginBottom: '2rem'}} />
                        <input className='editText' type='text' placeholder={state.name}  value={state.name} onChange={(e) => {dispatch({type: "name_change", value: e.target.value}); }} />
                        <input className='editText' type='text' placeholder={state.amount} value={state.amount} onChange={(e) => {dispatch({type: "amount_change", value: e.target.value}); }} />
                        <input className='editText' type='text' placeholder={state.category} value={state.category} onChange={(e) => {dispatch({type: "category_change", value: e.target.value}); }} />
                        <input className='editText' type='text'  placeholder={state.price} value={state.price} onChange={(e) => {dispatch({type: "price_change", value: e.target.value}); }} />
                        <input style={{marginTop: '2rem', marginBottom: '2rem'}} type='file' id='file' accept='image/png, image/jpeg' onChange={(e) => { dispatch({type: "file_change", value: e.target.files[0]}); preview(e.target.files[0]); }} /> 
                        <br/>
                        <button id='modalSubmit' onClick={(e) => { handleSubmit(e); }} >Submit</button>
                    </form>
                    <div className='modal-image'>
                        <img src={imageURL || defaultPicture} />
                    </div>
                </div>

            </div>
        </>
    );
}
