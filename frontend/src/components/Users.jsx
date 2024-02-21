import axios from "axios";
import Button from "./Button"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const authHeader = `Bearer ${localStorage.getItem('token')}`

        axios.get('http://localhost:3000/api/v1/user/bulk', {
            params: {
                filter: filter
            },

            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json"

            }

        })
            .then((response) => {
                setUsers(response.data.user);
            })
    }, [filter]);

    return(
        <div className="px-4 py-0">
            <div className="font-bold text-lg my-4">
                Users
            </div>
            <div className="mt-2 mb-4">
                <input type="text" placeholder="Search users..." onChange={(e) => {
                    setFilter(e.target.value);
                }} className="w-full px-2 py-1 border rounded border-slate-200"/>
            </div>

            <div>
                {users.map((user) => {
                    return <User user= {user} />
                })}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();

    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    {user.firstName} {user.lastName}
                </div>
            </div>  
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}/>
            </div>
        </div>
    )
}