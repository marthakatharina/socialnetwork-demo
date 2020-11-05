import React from "react";

export default function Xmpl({ first, last, imgUrl }) {
    console.log("props form App: ", first, last, imgUrl);
    return (
        <>
            <h2>
                I am the Xmpl component. My name is {first} {last}
            </h2>
            <img src={imgUrl || "/img.default.jpg"} />
        </>
    );
}
