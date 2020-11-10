import React, { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // editorIsVisible: false,
            // bio: props.bio,
            // id: props.id,
            // match: props.match,
            // history: props.history,
        };
    }

    componentDidMount() {
        axios
            .get("/api/user/:id", this.state)
            .then(({ data }) => {
                if (this.props.match.params.id == this.state.id) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: data,
                        first: data,
                        last: data,
                        url: data,
                        bio: data,
                    });
                }
            })
            .catch((err) =>
                console.log("err in axios get /user in OtherProfile: ", err)
            );
    }

    render() {
        return (
            <>
                <h1>Other Profile component</h1>
                <h2>
                    Name: {props.first} {props.last}
                </h2>
                <div className="user-image-large">
                    <ProfilePic
                        id={props.id}
                        first={props.first}
                        last={props.last}
                        url={props.url}
                        bio={props.bio}
                        toggleUploader={props.toggleUploader}
                    />
                </div>
                <h3>Bio: {props.bio}</h3>
                {/* {this.state.editorIsVisible && (
                    <textarea
                        name="bio"
                        placeholder="type bio..."
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.bio}
                    />
                )}
                {!this.props.bio && !this.state.editorIsVisible && (
                    <button onClick={this.textareaToggle}>Add your bio</button>
                )}
                {this.props.bio && !this.state.editorIsVisible && (
                    <button onClick={this.textareaToggle}>Edit your bio</button>
                )}
                {this.state.editorIsVisible && (
                    <button onClick={() => this.submitBio()}>Save</button>
                )} */}
                {/* <button onClick={this.textareaToggle}>Edit</button>
                {/* bind */}
                {/* <button onClick={() => this.submitBio()}>Save</button> */}{" "}
            </>
        );
    }
}
