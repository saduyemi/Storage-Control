import { useReducer, useState } from 'react'
import './InputForm.css'
import { LoginContext } from '../../App'
import { useAuth } from '../../Hooks/useAuth'; // could also put this hook in a context hook and just access it within component instead of importing
import { useNavigate } from 'react-router-dom';
import { arrayBufferToBlob, blobToBase64String } from 'blob-util';

const itemTemplate = {
    name: "",
    amount: 0,
    category: "",
    price: 0.0,
    file: null
};

function reducer(state, action) {
    switch(action.type) {
        case "name_change":
            return {...state, name: action.value};

        case "amount_change":
            return {...state, amount: action.value};

        case "category_change":
            return {...state, category: action.value};
        
        case "price_change":
            return {...state, price: action.value};
        
        case "file_change":
            console.log(`File changed to ${action.value}`)
            return {...state, file: action.value}; // Note only want to accept just one file

        default:
            return state;
    }
}

export default function InputForm() {
    const isAuthorized = useAuth();
    
    const [state, dispatch] = useReducer(reducer, itemTemplate);
    const [imageurl, setURL] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        console.log(state);
        fileToUri(state.file)
            .then(dataUri => {
                setURL(dataUri);
                console.log(dataUri);
                
                const data = {
                    name: state.name,
                    amount: state.amount,
                    category: state.category,
                    price: state.price,
                    picture: dataUri
                };

                const options = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                    body: JSON.stringify(data)
                }

                fetch("http://localhost:3000/create_item", options)
                    .then(result => { result.json(); })
                    .then(feedback => console.log(feedback))
                    .catch(err => console.log(err));
            })
            
        
    }

    if (isAuthorized) { 
        return (
            <>
                <div id='inputContainer'>
                    <form id='itemForm'>
                        <div className='inputTypes'>
                            <label htmlFor='name' className='inputLabels'> Item Name: </label>
                            <input type='text' id='name' placeholder='Name' onChange={(e) => {dispatch({type: "name_change", value: e.target.value})}} autoComplete='on'/> 
                        </div>

                        <div className='inputTypes'>                        
                            <label htmlFor='amount' className='inputLabels'> Item Amount: </label>
                            <input type='text' id='amount' placeholder='Amount' onChange={(e) => {dispatch({type: "amount_change", value: e.target.value})}} autoComplete='on'/> 
                        </div>

                        <div className='inputTypes'>
                            <label htmlFor='category' className='inputLabels'> Item Category: </label>
                            <input type='text' id='category' placeholder='Category' onChange={(e) => {dispatch({type: "category_change", value: e.target.value})}} autoComplete='on'/> 
                        </div>

                        <div className='inputTypes'>
                            <label htmlFor='price' className='inputLabels'> Item Price: </label>
                            <input type='text' id='price' placeholder='Price' onChange={(e) => {dispatch({type: "price_change", value: e.target.value})}} autoComplete='on'/> 
                        </div>
                        
                        <div className='inputTypes'>
                            <label htmlFor='file' className='inputLabels'> Input a Valid JPEG or PNG: </label>
                            <input type='file' id='file' accept='image/png, image/jpeg' onChange={(e) => {dispatch({type: "file_change", value: e.target.files[0]})}} /> 
                        </div> 

                        <button onClick={(e) => { handleSubmit(e); }}>Submit</button>                   
                    </form>
                </div>

                {(imageurl) 
                    ? 
                    <>
                        <p>Image</p> 
                        <img src={imageurl} />
                    </>
                    : 
                    <></>
                }
            </>
        );
    }
    else {
        return (
            <p>Loading......</p>
        );
    }
}

function fileToUri(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    })
}

function base64ToBlob(base, contentType, sliceSize=512) {
    const byteChars = atob(base);
    const byteArrays = [];

    for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
        const slice = byteChars.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        const blob = new Blob(byteArrays, {type: contentType});

        return blob;
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
            resolve(e.target.result);
        }

        reader.readAsDataURL(blob);
    })
}
/*
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsArrayBuffer(blob);

        reader.onloadend = (e) => {
            // obtaining array buffer
            let buffer = reader.result;

            // converting arraybuffer to base64 string
            let base64data = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
        }
    })
}
*/