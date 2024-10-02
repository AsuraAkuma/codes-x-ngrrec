import React from "react";
import './css/productCard.css';
import '../css/base.css';
// %PUBLIC_URL%
const ProductCard = ({ name, type, description }) => {
    // logic
    let image;
    switch (type) {
        case 'image':
            image = './media/image-solid.svg';
            break;
        case 'document':
            image = './media/image-solid.svg';
            break;
        case 'video':
            image = './media/image-solid.svg';
            break;
        case 'audio':
            image = './media/image-solid.svg';
            break;
        case 'pdf':
            image = './media/image-solid.svg';
            break;

        default:
            image = './media/image-solid.svg'; //make document image
            break;
    }
    const productId = `productCard-button-${name}`;
    // return html element
    return (
        <div className="productCard" id="productCard">
            <img className="productCard-image" alt="file type" src={image} />
            <p className="productCard-name">{name}</p>
            <p className="productCard-description">{description}</p>
            <button className="productCard-button" id={productId}>View</button>
        </div>
    )
};

export default AddButton;