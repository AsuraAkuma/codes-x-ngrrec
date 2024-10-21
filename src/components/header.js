import React, { useEffect, useState } from "react";
import './css/header.css'
import '../css/base.css'
// %PUBLIC_URL%
const Header = () => {
    // logic
    const [signedIn, setSignedIn] = useState();
    const buttonText = (signedIn === true) ? "Sign Out" : "Sign In";
    // Check if signed in
    function isSignedIn() {
        setSignedIn((sessionStorage.getItem('sessionKey')) ? true : false);
    }
    useEffect(() => {
        isSignedIn()
    }, [])
    const handleClick = (event) => {
        // Get id of element
        const targetId = event.target.id;
        // Check if targetId is valid if true procede to page, else return
        if (targetId === "header-section-button-signIn") {
            if (signedIn === true) {
                sessionStorage.clear();
                window.location.pathname = "/";
            } else {
                //sign in link
                window.location.pathname = "/signin";
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