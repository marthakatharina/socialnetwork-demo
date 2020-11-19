import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class DeleteAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
        };
    }

    getCurrentDisplay() {
        const step = this.state.step;
        if (step == 1) {
            return (
                <div>
                    <h1>Delete Account</h1>
                    <h3>Are your sure you want to delete your account?</h3>
                    {this.state.error && <div>Oops, something went wrong!</div>}

                    {/* <button>
                        <Link to="/delete/delete">Confirm</Link>
                    </button> */}

                    <button onClick={() => this.confirmDelete()}>
                        Confirm
                    </button>
                </div>
            );
        } else if (step == 2) {
            return (
                <div>
                    <h1>Delete Account</h1>
                    <h3>Are you really really sure?</h3>
                    {this.state.error && <div>Oops, something went wrong!</div>}

                    <button onClick={() => this.submitDelete()}>Delete</button>
                </div>
            );
        }
    }

    confirmDelete() {
        console.log("about to submit to reset");
        axios
            .get("/delete/confirm", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    this.setState((state) => ({ step: state.step + 1 }));
                    console.log(this.state.step);
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

    submitDelete() {
        axios
            .post("/delete/delete", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                        message: response.data.message,
                    });
                }
            })
            .catch((err) => console.log("err in axios post: submitCode ", err));
    }

    render() {
        return (
            <>
                <div className="component">
                    <div>{this.getCurrentDisplay()}</div>
                </div>
            </>
        );
    }
}
