import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/api/users")
            .then(({ data }) => {
                console.log("data", data);
                setUsers(data.rows);
            })
            .catch((err) => setError(err));

        let abort;

        axios
            .get(`/api/users/${user}`)
            .then(({ data }) => {
                console.log("data", data);

                if (!abort) {
                    setUsers(data.rows);
                }
            })
            .catch((err) => setError(err));

        return () => {
            abort = true;
        };
    }, [user]);

    return (
        <>
            <div className="component">
                {error && <div>Oops, something went wrong!</div>}

                <div style={{ margin: "20px" }}>
                    <input
                        placeholder="Search People..."
                        onChange={(e) => setUser(e.target.value)}
                        defaultValue={user}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                >
                    {Array.isArray(users) &&
                        users.map((user) => (
                            <div key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <div
                                        style={{
                                            margin: "40px 20px",
                                        }}
                                    >
                                        <div>
                                            <img
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    objectFit: "cover",
                                                }}
                                                src={
                                                    user.url ||
                                                    "./no-user-image.jpg"
                                                }
                                                alt={
                                                    user.first + "" + user.last
                                                }
                                            />

                                            <p style={{ margin: "0px" }}>
                                                {user.first} {user.last}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
