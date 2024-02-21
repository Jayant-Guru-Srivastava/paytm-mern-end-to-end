import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";

export default function Signup(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign Up"/>
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder="Tony" onChange={(e) => {
                        setFirstName(e.target.value);
                    }}/>
                    <InputBox label={"Last Name"} placeholder="Stark" onChange={(e) => {
                        setLastName(e.target.value);
                    }}/>
                    <InputBox label={"Email"} placeholder="tonystark@example.com" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                    <InputBox label={"Password"} placeholder="123456" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    <div className="pt-4">
                        <Button label="Sign up" onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                password,
                                firstName,
                                lastName
                            });

                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
        
        
    )
}