export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = Object.assign({}, state, {
            friendships: action.friendships,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
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
                    return;
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "RECEIVE_PENDING_REQUESTS") {
        {
            state = Object.assign({}, state, {
                requests: action.requests,
            });
        }
    }

    if (action.type == "CANCEL_FRIEND_REQUEST") {
        state = {
            ...state,
            requests: state.requests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
