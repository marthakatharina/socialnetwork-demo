import React from "react";

import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";

export default function Profile(props) {
    console.log("props in the profile component: ", props);

    const styling = {
        header: {
            color: "white",
        },
    };

    return (
        <>
            <h1 style={styling.header}>PROFILE COMPONENT</h1>
            <h2>
                Name: {props.first} {props.last}
            </h2>
            <div className="user-image-large">
                <ProfilePic
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    url={props.url}
                    bio={props.bio}
                    toggleUploader={props.toggleUploader}
                />
            </div>
            <h3>Bio: {props.bio}</h3>

            <BioEditor bio={props.bio} setBio={props.setBio} />
        </>
    );
}
