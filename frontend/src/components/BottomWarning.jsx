import { Link } from "react-router-dom";

export default function BottomWarning({label, buttonText, to}){
    return(
        <div className="text-sm py-2 flex justify-center">
            <div className="font-semibold pr-1" >
                {label}
            </div>
            <Link className="underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}