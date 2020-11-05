import React from "react";
import ReactDOM from "react-dom";
// import Registration from "./registration";
import Welcome from "./welcome";
// import Logo from "./logo";
import App from "./App";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    // elem = <h1>I will be the logo component</h1>;
    // elem = <Logo />;
    elem = <App />;
}

ReactDOM.render(/*<Registration/>*/ elem, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// } // moved to hello.world.js
