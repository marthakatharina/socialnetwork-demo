import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    const [error, setError] = useState(false);
    const [buttonMessage, setButtonMessage] = useState();

    useEffect(() => {
        axios
            .get(`/friendship/${id}`)
            .then(({ data }) => {
                console.log("data", data);
                setButtonMessage(data.message);
            })
            .catch((err) => setError(err));
    }, [buttonMessage]);

    function buttonClick() {
        axios
            .post(`/friendship/${buttonMessage}`, { id: id })
            .then(({ data }) => {
                console.log("data", data);
                setButtonMessage();
            })
            .catch((err) => setError(err));

        // (async () => {
        //     try {
        //         let { data } = await axios.post(
        //             `/friendship/${buttonMessage}`,
        //             { id: id }
        //         );
        //         setButtonMessage();
        //     } catch (err) {
        //         console.log("err in buttonClick()", err);
        //     }
        // })();
    }

    return (
        <>
            {error && <div>Oops, something went wrong!</div>}

            <button onClick={buttonClick}>{buttonMessage}</button>
        </>
    );
}
