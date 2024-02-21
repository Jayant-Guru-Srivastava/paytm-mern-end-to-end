import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function SendMoney() {
    const [amount, setAmount] = useState();
    // const {id, name} = useParams();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border rounded-lg bg-white max-w-md p-4 space-y-8 w-96 shadow-lg h-min text-card-foreground">
          <div className="flex justify-center">
            <Heading label={"Send Money"} />
          </div>
          <div className="pt-2 pl-6 pr-6 pb-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {name.toUpperCase()[0]}
              </div>
            </div>
            <div className="text-2xl font-semibold">{name.toUpperCase()[0] + name.substring(1, )}</div>
          </div>
          
          
          <div className="text-md font-bold mt-4">Amount (in ₹)</div>
          <div className="pt-2 pb-6">
            <input onChange={(e) => {
                setAmount(e.target.value);
            }} type="text" placeholder="Enter amount" className="w-full px-4 py-1 border rounded border-slate-200" />
          </div>
          <div>
            <Button label={"Initiate Transfer"} onClick={async () => {
                await axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: id,
                    amount: amount,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            }}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
