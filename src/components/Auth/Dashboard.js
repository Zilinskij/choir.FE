import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { App2 } from "../../App";

export function Dashboard() {
    return (
        <div>
            <App2 />
        </div>
    )
};

export function OutButton() {
    const { logout } = useContext(AuthContext)
    return (
        < button onClick={logout} > Вийти</button>
    )
}