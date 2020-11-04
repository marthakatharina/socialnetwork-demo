import React from "react";
import Registration from "./registration";
// import Logo from "./logo";
// import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPasword from "./password-reset";

export default function Welcome() {
    return (
        <div>
            <h1 className="title">I am the welcome component</h1>
            <img src="/circle-icon.png" />
            {/* <Registration /> */}
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPasword} />
                </div>
            </HashRouter>
        </div>
    );
}
