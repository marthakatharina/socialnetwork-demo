import axios from "./axios";

export async function receiveFriendsWannabes() {
    try {
        const { data } = await axios.get("/getFriends");

        console.log("data: ", data);
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            friendships: data.rows,
        };
    } catch (err) {
        console.log("err in receiveFriendsWannabes: ", err);
    }
}

export async function acceptFriend(otherUserId) {
    const { data } = await axios.post(`/acceptFriend/${otherUserId}`);
    if (data.success) {
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id: otherUserId,
        };
    }
}

export async function unFriend(otherUserId) {
    const { data } = await axios.post(`/unfriend/${otherUserId}`);
    if (data.success) {
        return {
            type: "UNFRIEND",
            id: otherUserId,
        };
    }
}
