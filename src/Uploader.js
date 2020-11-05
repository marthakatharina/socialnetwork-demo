import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props: ", this.props);
    }

    methodInUploader() {
        this.props.methodInApp("lalalalala");
    }

    render() {
        return (
            <>
                <h2>I am the uploader component</h2>
                <h2 onClick={() => this.methodInUploader}>
                    Click here o run the method in Uploader that triggers the
                    one in App
                </h2>
            </>
        );
    }
}
