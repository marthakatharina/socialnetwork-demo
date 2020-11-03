import React from "react";
import axios from "axios";
import Greetee from "./greetee";

// class component
export default class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "marta",
        }; // first stored in state is reneded in Greetee
    }
    componentDidMount() {
        console.log("mounted");
        setTimeout(() => {
            this.setState({
                first: "katarzyna", // here a value form the server // it updates {this.state.first}
            });
        }, 1000);
    }

    handleClick() {
        this.setState({
            first: "Pimento",
        });
    }

    render() {
        // or const {first} = this.state; then we call only {first} instead of {this.state.first}
        return (
            <div>
                {/* <p>Hello, World!</p> */}
                {/* <p>{this.state.first}</p> */}
                <p onClick={() => this.handleClick()}>Hello</p>
                <Greetee first={this.state.first} />
            </div>
        );
    }
}

// function component
// export default function HelloWorld() {
//     return (
//         <div>
//             <p>Hello, World!</p>
//             <p>Hello, World!</p>
//             <p>Hello, World!</p>
//             <p>Hello, World!</p>
//             <p>Hello, World!</p>
//         </div>
//     );
// }
