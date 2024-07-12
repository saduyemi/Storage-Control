const blobUtil = require('blob-util');
const base64Converter = require('base64-arraybuffer');

function blobToBase64(blob) { 
    return new Promise((resolve, reject) => { 
        const reader = new FileReader(); 
        reader.onloadend = (e) => { 
            resolve(e.target.result); 
        } 
        reader.readAsDataURL(blob); 
    }) 
}

function base64ToArrayBuffer(base64) {
    //let binaryString = atob(base64.split("base64,/")[1]);
    //let bytes = new Uint8Array(binaryString.length);
    //for (let i = 0; i < binaryString.length; i++) {
    //    bytes[i] = binaryString.charCodeAt(i);
    //}
    //return bytes.buffer;

    //let prepend = base64.split(",")[0] + ',/';
    //let rest = base64.split("base64,/")[1];
    //let buffer = base64Converter.decode(rest);
    //let complete = { prepend: prepend, buffer: buffer};

    let prepend = base64.split(",")[0] + ",/";
    let rest = base64.split("base64,/")[1];

    let bufferObj = Buffer.from(rest, "utf8");
    let complete = {prepend: prepend, buffer: bufferObj};

    return complete;
}

function arrayBufferToBase64(prepend, buffer) {
    /*let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);*/

    //let string = base64Converter.encode(buffer);
    //string = prepend + string;

    let string = buffer.toString("utf8");
    string = prepend + buffer;
    return string;
}

module.exports = {blobToBase64, base64ToArrayBuffer, arrayBufferToBase64};