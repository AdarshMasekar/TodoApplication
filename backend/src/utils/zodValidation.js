const zod = require("zod");

const todoSchema = zod.object({
    title:zod.string().min(5,"title must contain atleast 5 letters!"),
    category:zod.enum(["Personal","Work","Other"]),
    priority:zod.enum(["high","normal","low"]),
    dueDate:zod.string().date(),
    status:zod.enum(["pending","completed","expired"])
})

const statusSchema = zod.enum(["pending","completed","expired"]);

const statusValidator = (status) => statusSchema.safeParse(status);

const todoValidator = (title,category,priority,dueDate,status) => todoSchema.safeParse({
            title:title,
            category:category,
            priority:priority,
            dueDate:dueDate,
            status:status,
        })

const userSchema = zod.object({
    username:zod.string().min(5,"username should be atleast 5 letters!"),
    email:zod.string().email(),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."),
})

const userValidator = (username,email,password) => userSchema.safeParse({
    username:username,
    email:email,
    password:password
}
)


const signInSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."),
})

const signInValidator = (email,password) => signInSchema.safeParse(email,password);

const zodErrorHandle = (isValidZod) =>{
    return {"error":isValidZod.error.issues.map(issue=>issue.message).join(" and ")};
}

module.exports ={
    userValidator,
    signInValidator,
    statusValidator,
    todoValidator,
    zodErrorHandle
}
