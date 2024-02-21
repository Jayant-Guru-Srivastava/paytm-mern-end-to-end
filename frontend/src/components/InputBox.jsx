export default function InputBox({label, placeholder, onChange}){
    return(
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <div>
                <input type="text" placeholder={placeholder} className="w-full px-4 py-1 border rounded border-slate-200" onChange={onChange}/>
            </div>
        </div>
    )
}