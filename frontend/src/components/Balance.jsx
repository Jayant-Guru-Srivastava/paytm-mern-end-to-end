import { useEffect, useState } from "react"
import axios from "axios";

export default function Balance(){
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const authHeader = `Bearer ${localStorage.getItem("token")}`

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: authHeader
            }
        })
            .then((response) => {
                setBalance(response.data.balance);
            })
    }, []);

    return(
        <div className="flex px-4 pt-6">
            <div className="font-bold text-lg">
                Your Balance
            </div> 
            <div className="font-semibold text-lg ml-4">
                ₹{balance}
            </div>
        </div>
    ) 
}