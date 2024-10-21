import React from "react";
import './css/addButton.css';
import '../css/base.css';
// %PUBLIC_URL%
const AddButton = ({ buttonText, callback, buttonId }) => {
    // logic
    // return html element
    return (
        <div className="addButton" id={buttonId} onClick={callback}>
            <img className="addButton-image" alt="plus-button" src="./media/plus-solid.svg" />
            <p className="addButton-text">{buttonText}</p>
            <img className="addButton-image" alt="plus-button" src="./media/plus-solid.svg" />
            <div className="addButton-mask"></div>
        </div>
    )
};

export default AddButton;