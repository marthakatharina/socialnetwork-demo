import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    const [error, setError] = useState(false);
    const [buttonMessage, setButtonMessage] = useState("");

    useEffect(() => {
        axios
            .get(`/api/fiendship/${id}`)
            .then(({ data }) => {
                console.log("data", data);
                setUsers(data.rows);
            })
            .catch((err) => setError(err));

        axios
            .post(`/api/fiendship/${buttonMessage}`)
            .then(({ data }) => {
                console.log("data", data);

                setUsers(data.rows);
            })
            .catch((err) => setError(err));
    });

    return (
        <>
            {error && <div>Oops, something went wrong!</div>}

            <button>{buttonMessage}</button>
        </>
    );
}
