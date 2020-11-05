import React from "react";
import Logo from "./logo";
import Xmpl from "./Xmpl";
import Uploader from "./Uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Marta",
            last: "Wlusek",
            imgUrl: null,
            uploaderIsVisible: false,
        };

        this.methodInApp = this.methodInApp.bind(this);
    }
    componentDidMount() {
        console.log("App mounted");
    }

    toggleUploader() {
        // if (this.state.uploaderIsVisible)
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInApp(arg) {
        console.log("running in App component");
        console.log("the arg i got passed was: ", arg);
        console.log("this.state: ", this.state); // this here must be bind above
    }

    render() {
        // return <h2>Hey I am App component</h2>;
        return (
            <React.Fragment>
                <Logo />
                <header>
                    <h2>Hey I am App component</h2>
                </header>
                <div>
                    <Xmpl
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                    <h2 onClick={() => this.toggleUploader()}></h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                        // {this.methodInApp} this refers to the bind above
                    )}
                </div>
            </React.Fragment>
        );
    }
}
