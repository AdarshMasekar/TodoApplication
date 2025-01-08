function SubHeading({children, className}){
    return <div className={`text-lg font-semibold ${className}`}>
        {children}
    </div>
}

export default SubHeading;
