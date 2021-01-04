import React from "react";
import Registration from "./registration";
// import Logo from "./logo";
// import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPasword from "./password-reset";

// export default function Welcome() {
//     return (
//         <>
//             <div className="welcome-container">
//                 <div className="logo-dot"></div>
//                 <div className="circle-container">
//                     <div className="logo-large">
//                         <h1 className="title">Our Circle</h1>
//                         <div className="popup-form">
//                             <HashRouter>
//                                 <Route
//                                     exact
//                                     path="/"
//                                     component={Registration}
//                                 />
//                                 <Route path="/login" component={Login} />
//                                 <Route path="/reset" component={ResetPasword} />
//                             </HashRouter>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
        };
    }

    toggle() {
        // this is if (this.state.uploaderIsVisible) condition:
        this.setState({ isVisible: !this.state.isVisible });
    }

    render() {
        return (
            <>
                <div className="welcome-container">
                    <div
                        className="logo-dot"
                        onClick={() => this.toggle()}
                    ></div>
                    <div className="circle-container">
                        <div
                            className="logo-large"
                            onClick={() => this.toggle()}
                        >
                            <h1 className="title">Our Circle</h1>

                            {this.state.isVisible && (
                                <div className="popup-form">
                                    <HashRouter>
                                        <Route
                                            exact
                                            path="/"
                                            component={Registration}
                                        />
                                        <Route
                                            path="/login"
                                            component={Login}
                                        />
                                        <Route
                                            path="/reset"
                                            component={ResetPasword}
                                        />
                                    </HashRouter>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
