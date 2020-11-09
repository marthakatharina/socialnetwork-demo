import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,

            bio: props.bio,
        };
        this.textareaToggle = this.textareaToggle.bind(this);
    }
    textareaToggle() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
            bio: this.props.bio,
        });
    }

    methodInBioEditor() {
        this.props.setBio(this.state.bio);
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                bio: e.target.value,
            },
            () => console.log("this.state in the callback: ")
        );
    }

    submitBio() {
        console.log("about to submit in bio: ");
        axios
            .post("/bio", this.state)
            .then(({ data }) => {
                console.log("data", data);
                if (data) {
                    this.setState({
                        bio: data,
                        // bio: this.state.bio,
                    });

                    this.methodInBioEditor(data);
                    this.textareaToggle();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios post /bio: ", err));
    }

    render() {
        return (
            <>
                <h1>Bio Editor</h1>
                {/* <p>bio={props.bio}</p> */}
                {this.state.editorIsVisible && (
                    <textarea
                        name="bio"
                        placeholder="type bio..."
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.bio}
                    />
                )}

                <button onClick={this.textareaToggle}>Edit</button>
                {/* bind */}

                <button onClick={() => this.submitBio()}>Save</button>
            </>
        );
    }
}
