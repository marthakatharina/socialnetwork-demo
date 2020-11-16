import axios from "./axios";

export async function receiveFriendsWannabes() {
    try {
        const { data } = await axios.get("/getFriends");

        console.log("data in receiveFriendsWannabes: ", data);
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            friendships: data.rows,
        };
    } catch (err) {
        console.log("err in receiveFriendsWannabes: ", err);
    }
}

export async function acceptFriend(otherUserId) {
    let buttonMessage = "Accept Friend Request";
    try {
        const { data } = await axios.post(`/friendship/${buttonMessage}`, {
            id: otherUserId,
        });
        console.log("data in acceptFriend: ", data);
        if (data.success) {
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                id: otherUserId,
            };
        }
    } catch (err) {
        console.log("err in acceptFriend: ", err);
    }
}

export async function unFriend(otherUserId) {
    let buttonMessage = "Unfriend";
    try {
        const { data } = await axios.post(`/friendship/${buttonMessage}`, {
            id: otherUserId,
        });
        if (data.success) {
            return {
                type: "UNFRIEND",
                id: otherUserId,
            };
        }
    } catch (err) {
        console.log("err in unFriend: ", err);
    }
}

export async function receivePending() {
    try {
        const { data } = await axios.get("/getRequests");

        console.log("data in receivePending: ", data);
        return {
            type: "RECEIVE_PENDING_REQUESTS",
            requests: data.rows,
        };
    } catch (err) {
        console.log("err in receiveFriendsWannabes: ", err);
    }
}

export async function cancelRequest(otherUserId) {
    let buttonMessage = "Cancel Friend Request";
    try {
        const { data } = await axios.post(`/friendship/${buttonMessage}`, {
            id: otherUserId,
        });
        console.log("data in cancelRequest: ", data);
        if (data.success) {
            return {
                type: "CANCEL_FRIEND_REQUEST",
                id: otherUserId,
            };
        }
    } catch (err) {
        console.log("err in cancelRequest: ", err);
    }
}
