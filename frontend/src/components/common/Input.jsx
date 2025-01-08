function Input({type,name,onChange,value}){
    return <input className="input" placeholder={name} type={type} name={name} onChange={onChange} value={value}>
    </input>
}

export default Input;
