function Card({children, className}){
    return <div className={`flex flex-col w-64 rounded-lg p-4 gap-2 shadow-md ${className}`}>
        {children}
    </div>
}

export default Card;
