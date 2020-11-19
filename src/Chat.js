import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages", chatMessages);

    // const chatMessage = useSelector((state) => state && state.chatMessage);
    // console.log("chatMessage", chatMessage);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        // console.log("elemRef", elemRef);
        // console.log("scrollTop:", elemRef.current.scrollTop);
        // console.log("clientHeigth", elemRef.current.clientHeight);
        // console.log("scrollHeight", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const enterKey = (e) => {
        if (e.key === "Enter") {
            console.log("user want to send message");
            e.preventDefault();
            socket.emit("New Message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="component">
                <h1>Chat Room</h1>
                <div className="chat-container" ref={elemRef}>
                    {/* <div> */}
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <div key={each.id}>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/user/${each.sender_id}`}
                                >
                                    <div
                                        style={{
                                            marginTop: "50px",
                                            borderTop: "5px solid #3d3b3b",
                                            borderBottom: "5px solid #3d3b3b",
                                            // backgroundColor: "white",
                                        }}
                                    >
                                        <div style={{}}>
                                            <img
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                }}
                                                src={
                                                    each.url ||
                                                    "./no-user-image.jpg"
                                                }
                                                alt={
                                                    each.first + "" + each.last
                                                }
                                            />
                                            <p
                                                style={{
                                                    margin: "0px",
                                                    color: "#3d3b3b",
                                                }}
                                            >
                                                {each.created_at.slice(0, 10)}{" "}
                                                {each.created_at.slice(11, 16)}{" "}
                                                {each.first} {each.last} wrote:
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                backgroundColor: "white",
                                                // borderTop: "5px solid #3d3b3b",
                                            }}
                                            key={each.id}
                                        >
                                            <p
                                                style={{
                                                    color: "#3d3b3b",
                                                }}
                                            >
                                                {each.message}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* <p style={{ border: "1px solid #3d3b3b" }}>
                                        {each.message}
                                    </p> */}
                            </div>
                        ))}
                    {/* </div> */}
                </div>
                <textarea
                    // name="message"
                    // type="text"
                    onKeyDown={enterKey}
                    placeholder="type message..."
                />
            </div>
        </>
    );
}
