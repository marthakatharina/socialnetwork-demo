import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this); used with WHEN onChange={this.handleChange}
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
        console.log("about to submit: ");
        axios
            .post("/registration", this.state)
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
                {/* <h2>I am the Registration component</h2> */}
                <h3>
                    <Link style={{ color: "#3d3b3b" }} to="/login">
                        Click here to Log in!
                    </Link>
                </h3>
                {this.state.error && <div>Oops, something went wrong!</div>}
                <form>
                    <input
                        name="first"
                        placeholder="first name..."
                        onChange={(e) => this.handleChange(e)}
                        // onChange={this.handleChange}
                    ></input>
                    <input
                        name="last"
                        placeholder="last name..."
                        onChange={(e) => this.handleChange(e)}
                    ></input>
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
                        Register
                    </button>
                </form>
            </div>
        );
    }
}
