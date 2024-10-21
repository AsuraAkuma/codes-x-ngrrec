import React, { useState } from "react";
import './css/header.css'
import '../css/base.css'
// %PUBLIC_URL%
const Header = () => {
    // logic
    const [signedIn, setSignedIn] = useState(isSignedIn());
    const buttonText = (signedIn) ? "Sign Out" : "Sign In";
    // Check if signed in
    async function isSignedIn() {
        return (sessionStorage.getItem('sessionKey')) ? true : false;
    }

    const handleClick = (event) => {
        // Get id of element
        const targetId = event.target.id;
        // Check if targetId is valid if true procede to page, else return
        if (targetId === "header-section-button-signIn") {
            //sign in link
            if (window.location.origin == "http://localhost:3000") {
                window.location.pathname = "/signin";
            } else {
                window.location.href = "";

            }
        } else {
            return;
        }
    };

    // return html element
    return (
        <div className="header" id="header">
            <section className="header-section" id="header-section-name">
                <h1 className="header-name-text">CODES x NGRREC</h1>
            </section>
            <section className="header-section" id="header-section-signIn">
                <button onClick={handleClick} className="header-section-button" id="header-section-button-signIn">{buttonText}</button>
            </section>
        </div>
    )
};

export default Header;