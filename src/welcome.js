import React from "react";
import Registration from "./registration";
// import Logo from "./logo";
// import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPasword from "./password-reset";

export default function Welcome() {
    return (
        <>
            {/* <img src="/circle-icon.png" /> */}

            <div className="welcome-container">
                <div className="logo-dot"></div>
                <div className="circle-container">
                    <div className="logo-large">
                        <h1 className="title">Our Circle</h1>
                        <HashRouter>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={ResetPasword} />
                        </HashRouter>
                    </div>
                </div>
            </div>
        </>
    );
}
