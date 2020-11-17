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
    }, []);

    const enterKey = (e) => {
        if (e.key === "Enter") {
            console.log("user want to send message");
            e.preventDefault();
            socket.emit("NEW_MESSAGE", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <h1>Welcome to Chat </h1>
            <div className="chat-container" ref={elemRef}>
                <p>
                    {chatMessages &&
                        chatMessages.map((user) => {
                            <div key={user.id}>{user.message}</div>;
                        })}
                </p>
                {/* <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p>
                <p>chat messages</p> */}
            </div>
            <textarea onKeyDown={enterKey} placeholder="type message..." />
        </>
    );
}
