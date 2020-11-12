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

    const ProfilePic = ({ first, last, url, onClick, classProp }) => (
        <img
            className={classProp}
            src={url}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    );

    return (
        <>
            <h1 style={styling.header}>PROFILE COMPONENT</h1>
            <h2>
                {props.first} {props.last}
            </h2>
            <div>
                <ProfilePic
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    url={props.url}
                    onClick={props.toggleUploader}
                    classProp="user-image-large"
                />
            </div>
            <h3>Bio: {props.bio}</h3>

            <BioEditor bio={props.bio} setBio={props.setBio} />
        </>
    );
}
