import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in the callback: ")
        );
    }

    submit() {
        console.log("about to submit to login");
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios post: ", err));
    }

    render() {
        console.log("this.state.error: ", this.state.error);
        return (
            <div>
                {/* <h2>I am the Login component</h2> */}
                <h3>
                    Not a member?{" "}
                    <Link style={{ color: "#3d3b3b" }} to="/">
                        Click here to Register!
                    </Link>
                </h3>

                {this.state.error && <div>Oops, something went wrong!</div>}
                <div className="form">
                    <input
                        name="email"
                        placeholder="email..."
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                    ></input>

                    <button id="welcome-button" onClick={() => this.submit()}>
                        Login
                    </button>
                </div>
                <h3>
                    Forgot your password?{" "}
                    <Link style={{ color: "#3d3b3b" }} to="/reset">
                        Click here to Reset.
                    </Link>
                </h3>
            </div>
        );
    }
}
