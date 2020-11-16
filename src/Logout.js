import axios from "./axios";
import React, { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        axios.get(`/logout`).then(() => {
            location.replace("/welcome#/login");
        });
    });

    return <></>;
}
