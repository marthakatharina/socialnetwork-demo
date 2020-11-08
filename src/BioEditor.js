import React, { Component } from "react";

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
        });
    }

    methodInBioEditor() {
        this.props.setBio(this.state.bio);
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

    submitBio() {
        console.log("about to submit in bio: ");
        axios
            .post("/bio", this.state)
            .then(({ data }) => {
                console.log("response", response);
                if (data.success) {
                    this.setState((state) => ({
                        bio: state.bio,
                    }));
                    // this.setState({
                    //     bio: data,
                    // });
                    this.methodInBioEditor();
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
                    />
                )}
                <button onClick={this.textareaToggle}>Edit</button>

                <button onClick={() => this.submitBio()}>Save</button>
            </>
        );
    }
}
