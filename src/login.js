import React from "react";
import axios from "./axios";

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
                <h2>I am the Login component</h2>
                {this.state.error && <div>Oops, something went wrong!</div>}

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
                <button onClick={() => this.submit()}>Login</button>
            </div>
        );
    }
}
