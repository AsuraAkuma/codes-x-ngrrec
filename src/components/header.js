import React, { useState } from "react";
import './css/header.css'
import '../css/base.css'
// %PUBLIC_URL%
const Header = () => {
    // logic
    const [signedIn, setSignedIn] = useState(false);
    const buttonText = (signedIn) ? "Sign Out" : "Sign In";
    const memberKey = window.localStorage.getItem('memberKey');
    if (memberKey === null) {
        setSignedIn(false);
        window.localStorage.setItem('memberKey', undefined);
    } else if (memberKey !== "null" && memberKey !== "undefined" && !signedIn) {
        setSignedIn(true);
    }
    // return html element
    return (
        <div className="header" id="header">
            <section className="header-section" id="header-section-name">
                <h1 className="header-name-text">CODES x NGRREC</h1>
            </section>
            <section className="header-section" id="header-section-signIn">
                <button className="header-section-button" id="header-section-button-signIn">{buttonText}</button>
            </section>
        </div>
    )
};

export default Header;