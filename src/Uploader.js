import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            url: props.url,
            uploaderIsVisible: false,
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
        console.log("about to submit Image!!!", this.state);

        var formData = new FormData(); // formData sends stuff to the server axios

        formData.append("file", this.state.file);
        // formData.append("id", this.state.id);
        // formData.append("imageUrl", this.state.imageUrl);
        // formData.append("first", this.props.first);
        // formData.append("last", this.props.last);

        axios
            .post("/image", FormData)
            .then(({ data }) => {
                console.log("response", response);
                if (data.success) {
                    this.setState({
                        url: data.rows.url,
                    });

                    this.methodInUploader("imageUrl");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios post /image: ", err));
    }

    render() {
        return (
            <>
                <h2>I am the uploader component</h2>
                <div
                    className="uploader-component"
                    onClick={() => this.methodInUploader()}
                >
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
