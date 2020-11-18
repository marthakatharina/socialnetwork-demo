import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
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
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <div key={each.id}>
                                <p>{each.message}</p>
                            </div>
                        ))}
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
