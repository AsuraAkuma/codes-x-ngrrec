import React from "react";
import './css/error.css'
import '../css/base.css'

const ErrorMessage = ({ showing, message }) => {

    return (
        <div className={(showing) ? "error" : "error hidden"} id="error">
            <p className="error-message" id="error-message">Error: {message}</p>
        </div>
    )
}

export default ErrorMessage;