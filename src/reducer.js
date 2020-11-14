export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = Object.assign({}, state, {
            friendships: action.friendships,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        // const user = { ...state.user, bio: action.bio };
        // return { ...state, user };
        state = {
            ...state,
            friendships: state.friendships.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendships: state.friendships.filter((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        // unfriended: true,
                        accepted: false,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
