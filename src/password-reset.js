import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    // getCurrentDisplay() {
    //     const step = this.state.step;
    //     if (step == 1) {
    //         return( <div>show 1st display</div>)

    //     } else if (step == 2) {
    //         return( <div>show 2nd display</div>)

    //     } else if (step == 3) {
    //         return( <div>show 3rd display</div>)
    // }

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
        console.log("about to submit to reset");
        axios
            .post("/reset", this.state)
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
                <h2>I am the Reset Password component</h2>
                <h3>
                    Please enter the email address with which your registered
                </h3>
                {this.state.error && <div>Oops, something went wrong!</div>}

                <input
                    name="email"
                    placeholder="email..."
                    onChange={(e) => this.handleChange(e)}
                ></input>
                {/* <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                ></input> */}
                <button onClick={() => this.submit()}>Login</button>
            </div>
        );
    }
}
