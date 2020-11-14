import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friendships = useSelector(
        (state) =>
            state.frienships &&
            state.frienships.filter((user) => user.accepted == true)
    );

    // const wannabies = useSelector(
    //     (state) =>
    //         state.frienships &&
    //         state.frienships.filter((user) => user.accepted == false)
    // );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    // if (!friendships) {
    //     return null;
    //     // return "No friends yet";
    // }

    return (
        <>
            <h1>Friends component</h1>

            <div style={{ margin: "20px" }}>
                {friendships &&
                    friendships.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <div style={{ marginTop: "50px" }}>
                                    <img
                                        style={{ width: "100px" }}
                                        src={user.url || "./no-user-image.jpg"}
                                        alt={user.first + "" + user.last}
                                    />
                                    <p style={{ margin: "0px" }}>
                                        {user.first} {user.last}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}
