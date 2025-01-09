const Router = require("express");
const router = Router();
const {getTodo,getTodos,createTodo,updateTodo,updateStatus,deleteTodo} = require("../controllers/todoController");
const { todoValidator,statusValidator,zodErrorHandle } = require("../utils/zodValidation");
const {verifyToken} = require("../middlewares/authMiddleware")


router.get("/",verifyToken,async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const response = await getTodos(token);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json(response.todos)
})

router.get("/:todoId",verifyToken,async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const response = await getTodo(req.params.todoId,token);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json(response.todo)
})

router.post("/",verifyToken,async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const title = req.body.title;
    const category = req.body.category;
    const priority = req.body.priority;
    const dueDate = req.body.dueDate;
    const status = req.body.status;
    const isValidTodo = todoValidator(title,category,priority,dueDate,status);
    if(!isValidTodo.success){
        return res.status(400).json(zodErrorHandle(isValidTodo))
    }
    const response = await createTodo({title,category,priority,dueDate,status},token);
    console.log(response)
    if(!response.success){
        return res.status(500).json(response.error);
    }
    res.status(201).json({"success":true,"message":"todo created successfully!"});
})

router.put("/:todoId",verifyToken,async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const todoId = req.params.todoId;
    const title = req.body.title;
    const category = req.body.category;
    const priority = req.body.priority;
    const dueDate = req.body.dueDate;
    const status = req.body.status;

    const isValidTodo = todoValidator(title,category,priority,dueDate,status);
    if(!isValidTodo.success){
        return res.status(400).json(zodErrorHandle(isValidTodo))
    }
    const response = await updateTodo(todoId,{title,category,priority,dueDate,status},token);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})


router.patch("/status/:todoId",verifyToken,async(req,res)=>{
    const todoId = req.params.todoId;
    const status = req.body.status;
    const token = req.headers.authorization.split(" ")[1];
    const isValidStatus = statusValidator(status);

    if(!isValidStatus.success){
        return res.status(400).json(zodErrorHandle(isValidStatus))
    }
    const response = await updateStatus(todoId,status,token);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})

router.delete("/:todoId",verifyToken,async(req,res)=>{
    const todoId = req.params.todoId;
    const token = req.headers.authorization.split(" ")[1];
    const response = await deleteTodo(todoId,token);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})

module.exports = router;
