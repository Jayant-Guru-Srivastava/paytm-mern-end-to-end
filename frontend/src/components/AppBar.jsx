import { useEffect, useState } from "react";
import Heading from "./Heading";
import axios from "axios";

export default function AppBar(){
    const [user, setUser] = useState({firstName: ""});

    useEffect(() => {
        const authHeader = `Bearer ${localStorage.getItem("token")}`

        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                Authorization: authHeader
            }
        })
            .then((response) => {
                setUser(response.data.user);
            })
    }, [])

    return (
        <div className="shadow flex justify-between p-4">
        <div className="flex flex-col justify-center h-full py-4">
            <div className="text-2xl font-bold">
                Payment's App
            </div>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-lg">
                Hello, {user.firstName.toUpperCase()[0] + user.firstName.substring(1,)}
            </div>
            <div className="flex flex-col justify-center">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName.toUpperCase()[0]}
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}