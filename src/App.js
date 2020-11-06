import React from "react";
import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            imageUrl: "",
            // bio: "",
            // file: null,
            uploaderIsVisible: false,
        };

        this.sendPic = this.sendPic.bind(this);
    }
    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({ ...data }, () =>
                    console.log("this.state: ", this.state)
                );
            })
            .catch((err) => console.log("err in axios get /user: ", err));
    }

    toggleUploader() {
        // this is if (this.state.uploaderIsVisible) condition:
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    sendPic(file) {
        console.log("running in App component");
        console.log("the arg i got passed was: ", file);
        console.log("this.state: ", this.state); // this here must be bind above

        var formData = new FormData(); // formData sends stuff to the server axios

        formData.append("file", this.file);
        formData.append("first", this.first);
        formData.append("last", this.last);

        axios
            .post("/image", FormData)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    this.setState((state) => ({
                        uploaderIsVisible: state.uploaderIsVisible,
                    }));
                    // this.setState({
                    //     uploaderIsVisible: !this.state.uploaderIsVisible,
                    // });
                    console.log(this.state.uploaderIsVisible);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => console.log("err in axios post: ", err));
    }

    render() {
        // return <h2>Hey I am App component</h2>;
        return (
            <React.Fragment>
                <header>
                    <Logo />
                    <h2>Hey I am App component</h2>
                </header>
                <div>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                    <h2 onClick={() => this.toggleUploader()}>
                        Changing state with a method: toggleUploader
                        {this.state.uploaderIsVisible && " 🐵"}
                        {!this.state.uploaderIsVisible && " 🙈"}
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader sendPic={this.sendPic} />
                        // {this.sendPic} this refers to the bind above
                    )}
                </div>
            </React.Fragment>
        );
    }
}
