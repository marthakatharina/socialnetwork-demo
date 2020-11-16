import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("welcome", (msg) => {
            console.log("message: ", msg);
        });
        // it receives the message form the server welcome.name //"marta"

        // socket.on to start listening for a message
        socket.on("messageSentWithIoEmit", (payload) => {
            console.log("payload: ", payload);
        });

        socket.on("broadcastEmit", (data) => {
            console.log("broadcastEmit data: ", data);
        });

        //client event emmit:
        socket.emit("messageFromClient", [1, 2, 3]);
    }
};
