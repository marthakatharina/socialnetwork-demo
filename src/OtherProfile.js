import React, { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match: ", this.props.match);
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                console.log("data: ", data);
                if (data) {
                    if (this.props.match.params.id == this.props.id) {
                        this.props.history.push("/");
                    } else {
                        this.setState({
                            id: data.id,
                            first: data.first,
                            last: data.last,
                            url: data.url,
                            bio: data.bio,
                        });
                    }
                } else {
                    this.setState({
                        error: true,
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
                {this.state.error && <div>Oops, something went wrong!</div>}
                <div key={this.state.id}>
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>

                    <img src={this.state.url || "/no-user-image.jpg"} />

                    <h3>Bio: {this.state.bio}</h3>
                </div>
            </>
        );
    }
}
