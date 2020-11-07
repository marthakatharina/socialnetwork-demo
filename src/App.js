import React from "react";
import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // id: "",
            // first: "",
            // last: "",
            // url: "",
            // bio: "",

            uploaderIsVisible: false,
        };

        this.sendPic = this.sendPic.bind(this);
    }
    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                if (data.success) {
                    // this.setState((state) => ({
                    //     id: state.id,
                    //     first: state.first,
                    //     last: state.last,
                    //     url: state.url,
                    // }));
                    this.setState({
                        id: data.rows.id,
                        first: data.rows.first,
                        last: data.rows.last,
                        email: data.rows.email,
                        url: data.rows.url,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios get /user: ", err));
    }

    toggleUploader() {
        // this is if (this.state.uploaderIsVisible) condition:
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    sendPic(url) {
        console.log("running in App component");
        console.log("the arg i got passed was: ", url);
        console.log("this.state: ", this.state);
        this.setState({ url: url }); // this here must be bind above
    }

    render() {
        // return <h2>Hey I am App component</h2>;
        return (
            <React.Fragment>
                <header>
                    <Logo />
                    <h2>Hey I am App component</h2>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
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
                    // {this.sendPic} this refers to the bind above
                )}
                {/* </div> */}
            </React.Fragment>
        );
    }
}
