import React from "react";
import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "./axios";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./OtherProfile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // id: "",
            // first: "",
            // last: "",
            // url: null,
            // bio: "",

            uploaderIsVisible: false,
        };

        this.sendPic = this.sendPic.bind(this);
    }
    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/api/user")
            .then(({ data }) => {
                // if (data) {
                // this.setState((state) => ({
                //     id: state.id,
                //     first: state.first,
                //     last: state.last,
                //     url: state.url,
                // }));
                this.setState({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    url: data.url,
                    bio: data.bio,
                });
                // } else {
                //     this.setState({
                //         error: true,
                //     });
                // }
            })
            .catch((err) => console.log("err in axios get /user: ", err));
    }

    toggleUploader() {
        // this is if (this.state.uploaderIsVisible) condition:
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    sendPic(arg) {
        console.log("the arg i got passed in sendPic was: ", arg);
        console.log("this.state: ", this.state);

        this.setState({ url: arg }); // this here must be bind above
    }

    setBio(arg) {
        console.log("the arg i got passed in setBio was: ", arg);
        this.setState({ bio: arg });
    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <Logo />

                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        id={this.state.id}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </header>
                {/* <div> */}
                {/* <h2 onClick={() => this.toggleUploader()}> */}
                {/* {this.state.uploaderIsVisible && <ProfilePic />}
                        {!this.state.uploaderIsVisible && <ProfilePic />} */}
                {/* </h2> */}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        sendPic={this.sendPic}
                        toggleUploader={() => this.toggleUploader()}
                    />
                    // {this.sendPic} this refers to the bind above, this is how it looks like in conjunction with bind(this)
                )}
                {/* </div> */}
                <div className="profile-container">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                url={this.state.url}
                                bio={this.state.bio}
                                toggleUploader={() => this.toggleUploader()}
                                setBio={(arg) => this.setBio(arg)}
                            />
                        )}
                    />
                    <Route
                        path="/api/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
