import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            url: props.url,
            closeUploader: props.toggleUploader,
        };
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props: ", this.props);
    }

    methodInUploader() {
        this.props.sendPic(this.state.url);
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.files[0],
                url: e.target.files[0].name,
            },
            () =>
                console.log(
                    "this.state in the callback handleChange: ",
                    this.state.url
                )
        );
    }

    submitImage() {
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/image", formData)
            .then(({ data }) => {
                this.setState({
                    url: data,
                });
                this.methodInUploader();
            })
            .catch(function (err) {
                console.log("error in axios post /image", err);
            });
    }

    render() {
        return (
            <>
                <h2>I am the uploader component</h2>
                <div
                    className="uploader-component"
                    onClick={() => this.methodInUploader()}
                >
                    <div onClick={this.state.closeUploader}>x</div>
                    Click here to run the method in Uploader that triggers the
                    one in App
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={() => this.submitImage()}>
                        Upload image
                    </button>
                </div>
            </>
        );
    }
}
