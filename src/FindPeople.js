import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    // const [first, setFirst] = useState("");
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     axios
    //         .get("/api/users")
    //         .then(({ data }) => {
    //             setRecentUsers({
    //                 id: data.id,
    //                 first: data.first,
    //                 last: data.last,
    //                 url: data.url,
    //             });
    //         })
    //         .catch((err) => setError(err));
    // }, []);

    useEffect(() => {
        axios
            .get("/api/users")
            .then(({ data }) => {
                setRecentUsers({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    url: data.url,
                });
            })
            .catch((err) => setError(err));

        axios
            .get(`/api/users/${user}`)
            .then(({ data }) => {
                console.log("data: ", data);
                setUsers({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    url: data.url,
                });
            })
            .catch((err) => setError(err));
        return () => {
            console.log(`about to replace /${user} with a new value`);
        };
    }, [user]);

    return (
        <div>
            <h2>Find People component</h2>
            {error && <div>Oops, something went wrong!</div>}

            <h3>Recently joined:</h3>
            <ul>
                {Array.isArray(recentUsers) &&
                    recentUsers.map((each, id) => {
                        <li key={id}>{each}</li>;
                    })}
            </ul>

            <h3>Find people</h3>
            <input
                name="user"
                placeholder="search users"
                onChange={(e) => setUser(e.target.value)}
                defaultValue={user}
            />

            <ul>
                {Array.isArray(users) &&
                    users.map((each, user) => {
                        <li key={user.id}>{each}</li>;
                    })}
            </ul>
        </div>
    );
}
