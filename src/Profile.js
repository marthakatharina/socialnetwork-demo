import React from "react";

import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default function Profile(props) {
    console.log("props in the profile component: ", props);
    return (
        <>
            <h1>PROFILE COMPONENT</h1>
            <span>
                Name: {props.first} {props.last}
            </span>
            <div>Bio: {props.bio}</div>

            <BioEditor bio={props.bio} setBio={props.setBio} />

            <ProfilePic
                id={props.id}
                first={props.first}
                last={props.last}
                url={props.url}
                bio={props.bio}
                toggleUploader={props.toggleUploader}
            />
        </>
    );
}
