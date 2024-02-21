import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard(){

    return(
        <div>
            <AppBar/>
            <Balance/>
            <Users/>
        </div>
    )
}