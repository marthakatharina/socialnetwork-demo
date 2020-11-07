import React from "react";

export default function ProfilePic({ first, last, imageUrl, toggleUploader }) {
    console.log("props form App: ", first, last, imageUrl);
    return (
        <>
            <h2>
                I am the ProfilePic component. My name is {first} {last}
            </h2>
            <img
                className="user-image-small"
                src={imageUrl || "/no-user-image.jpg"}
                alt={first + "" + last}
                onClick={toggleUploader}
            />
        </>
    );
}
