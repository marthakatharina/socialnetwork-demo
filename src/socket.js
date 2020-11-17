import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // socket.on("getChatMessages", (msgs) =>
        //     console.log("last ten chat msgs:", msgs);
        // store.dispatch(
        //             chatMessages(msgs)
        //         )
        //     // what you want to do with this
        //     // once it logs the actual chat history is dispatch an action the then
        //     // adds the history to redux global state

        // );

        socket.on("getChatMessages", (msgs) =>
            store.dispatch(chatMessages(msgs))
        );

        // socket.on("addToChatMessages", (newMsg) => {
        //     console.log("new msg to add to chat", newMsg); // this will eventually be a new
        //     // msg object, need to dispatch an action to add the object
        //     // to redux global state
        // });

        socket.on("addToChatMessages", (newMsg) =>
            store.dispatch(chatMessage(newMsg))
        );
    }
};

///// IVANA'S ENCOUNTER /////
// export let socket;

// export const init = (store) => {
//     if (!socket) {
//         socket = io.connect();

//         socket.on("welcome", (msg) => {
//             console.log("message: ", msg);
//         });
//         // it receives the message form the server welcome.name //"marta"

//         // socket.on to start listening for a message
//         socket.on("messageSentWithIoEmit", (payload) => {
//             console.log("payload: ", payload);
//         });

//         socket.on("broadcastEmit", (data) => {
//             console.log("broadcastEmit data: ", data);
//         });

//         //client event emmit:
//         socket.emit("messageFromClient", [1, 2, 3]);
//     }
// };
