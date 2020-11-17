import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriend,
    unFriend,
    receivePending,
    cancelRequest,
} from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter((user) => user.accepted == true)
    );

    const wannabies = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter((user) => user.accepted == false)
    );

    const pending = useSelector(
        (state) =>
            state.requests &&
            state.requests.filter((user) => user.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
        dispatch(receivePending());
    }, []);

    // if (!friends) {
    //     return null;
    //     // return "No friends yet";
    // }

    return (
        <>
            <div className="friends-component">
                {/* <h1>Friends component</h1> */}

                <div style={{ margin: "20px" }}>
                    {friends && <h2>Friends</h2>}
                    {friends &&
                        friends.map((user) => (
                            <div key={user.id}>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/user/${user.id}`}
                                >
                                    <div style={{ marginTop: "50px" }}>
                                        <img
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                            src={
                                                user.url ||
                                                "./no-user-image.jpg"
                                            }
                                            alt={user.first + "" + user.last}
                                        />
                                        <p
                                            style={{
                                                margin: "0px",
                                                color: "#3d3b3b",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => dispatch(unFriend(user.id))}
                                >
                                    Unfriend
                                </button>
                            </div>
                        ))}
                </div>

                <div style={{ margin: "20px" }}>
                    {wannabies && <h2>Wannabies</h2>}
                    {wannabies &&
                        wannabies.map((user) => (
                            <div key={user.id}>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/user/${user.id}`}
                                >
                                    <div style={{ marginTop: "50px" }}>
                                        <img
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                            src={
                                                user.url ||
                                                "./no-user-image.jpg"
                                            }
                                            alt={user.first + "" + user.last}
                                        />
                                        <p
                                            style={{
                                                margin: "0px",
                                                color: "#3d3b3b",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(acceptFriend(user.id))
                                    }
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                </div>

                <div style={{ margin: "20px" }}>
                    {pending && <h2>Pending</h2>}
                    {pending &&
                        pending.map((user) => (
                            <div key={user.id}>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/user/${user.id}`}
                                >
                                    <div style={{ marginTop: "50px" }}>
                                        <img
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                            src={
                                                user.url ||
                                                "./no-user-image.jpg"
                                            }
                                            alt={user.first + "" + user.last}
                                        />
                                        <p
                                            style={{
                                                margin: "0px",
                                                color: "#3d3b3b",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(cancelRequest(user.id))
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
