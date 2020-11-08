import React, { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
        };
        this.textareaToggle = this.textareaToggle.bind(this);
    }
    textareaToggle() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }
    render() {
        return (
            <>
                <h1>Bio Editor</h1>
                {this.state.editorIsVisible && <textarea />}
                <button onClick={this.textareaToggle}>Save</button>
            </>
        );
    }
}
