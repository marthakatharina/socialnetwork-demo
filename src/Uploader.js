import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                <div className="uploader-component">
                    <div className="close-x" onClick={this.state.closeUploader}>
                        x
                    </div>

                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={() => this.submitImage()}>
                        Upload Profile Picture
                    </button>

                    <ul>
                        <li>
                            <Link
                                style={{
                                    color: "#3d3b3b",
                                }}
                                to="/"
                            >
                                Your Profile
                            </Link>
                        </li>
                        <li>
                            <Link style={{ color: "#3d3b3b" }} to="/users">
                                Find People
                            </Link>
                        </li>
                        <li>
                            <Link style={{ color: "#3d3b3b" }} to="/friends">
                                Friendships
                            </Link>
                        </li>
                        <li>
                            <Link style={{ color: "#3d3b3b" }} to="/chat">
                                Chat Room
                            </Link>
                        </li>
                        <li>
                            <Link style={{ color: "#3d3b3b" }} to="/logout">
                                Logout
                            </Link>
                        </li>
                        <li>
                            <Link style={{ color: "#3d3b3b" }} to="/delete">
                                Delete Account
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}
