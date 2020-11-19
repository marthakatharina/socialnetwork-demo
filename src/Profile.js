import React from "react";

import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
// import Wall from "./Wall";

export default function Profile(props) {
    console.log("props in the profile component: ", props);

    // const styling = {
    //     header: {
    //         color: "white",
    //     },
    // };

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
            {/* <h1 style={styling.header}>PROFILE COMPONENT</h1> */}
            <div className="component">
                <h1>
                    {props.first} {props.last}
                </h1>
                <div>
                    <ProfilePic
                        id={props.id}
                        first={props.first}
                        last={props.last}
                        url={props.url || "/no-user-image.jpg"}
                        onClick={props.toggleUploader}
                        classProp="user-image-large"
                    />
                </div>
                <h3>{props.bio || "No bio yet."}</h3>

                <BioEditor bio={props.bio} setBio={props.setBio} />

                {/* <div>
                    <Wall />
                </div> */}
            </div>
        </>
    );
}
