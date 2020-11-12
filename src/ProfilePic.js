import React from "react";

export default function ProfilePic({ first, last, url, toggleUploader }) {
    console.log("props form App: ", first, last, url);
    return (
        <>
            <img
                className="user-image-small"
                src={url || "/no-user-image.jpg"}
                alt={first + " " + last}
                onClick={toggleUploader}
            />
        </>
    );
}
