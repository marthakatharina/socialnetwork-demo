import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
        };
    }

    getCurrentDisplay() {
        const step = this.state.step;
        if (step == 1) {
            // return( <div>show 1st display</div>)
            return (
                <div>
                    <h2>I am the Reset Password component</h2>
                    <h3>
                        Please enter the email address with which your
                        registered
                    </h3>
                    {this.state.error && <div>Oops, something went wrong!</div>}

                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    ></input>

                    <button onClick={() => this.submitEmail()}>Reset</button>
                </div>
            );
        } else if (step == 2) {
            // return( <div>show 2nd display</div>)
            return (
                <div>
                    <h2>I am the Reset Password component</h2>
                    <h3>
                        Please enter the code sent to your email address and
                        enter your new password
                    </h3>
                    {this.state.error && <div>Oops, something went wrong!</div>}

                    <input
                        name="code"
                        placeholder="enter code"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="password"
                        placeholder="new password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={() => this.submitCode()}>Reset</button>
                </div>
            );
        } else if (step == 3) {
            // return (<div>show 3rd display</div>)
            return (
                <div>
                    <h2>I am the Reset Password component</h2>
                    <h3>
                        Go back to <Link to="/login">log in</Link>
                    </h3>
                </div>
            );
        }
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

    submitEmail() {
        console.log("about to submit to reset");
        axios
            .post("/reset/start", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    this.setState((state) => ({ step: state.step + 1 }));
                    console.log(this.setState);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) =>
                console.log("err in axios post: submitEmail ", err)
            );
    }

    submitCode() {
        axios
            .post("/reset/verify", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    this.setState((state) => ({ step: state.step + 1 }));
                    console.log(this.setState);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios post: submitCode ", err));
    }

    render() {
        // console.log("this.state.error: ", this.state.error);

        return (
            <div>
                {/* {this.state.error && <div>Oops, something went wrong!</div>} */}
                {this.getCurrentDisplay()}
            </div>
        );
    }
}
