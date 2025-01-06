const Router = require("express");
const router = Router();
const {getTodo,getTodos,createTodo,updateTodo,updateStatus,deleteTodo} = require("../controllers/todoController");
const { todoValidator,statusValidator,zodErrorHandle } = require("../utils/zodValidation");


router.get("/",async(req,res)=>{
    const response = await getTodos();
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json(response.todos)
})

router.get("/:todoId",async(req,res)=>{
    const response = await getTodo(req.params.todoId);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json(response.todo)
})

router.post("/",async(req,res)=>{
    const title = req.body.title;
    const category = req.body.category;
    const priority = req.body.priority;
    const dueDate = req.body.dueDate;
    const status = req.body.status;

    const isValidTodo = todoValidator(title,category,priority,dueDate,status);
    if(!isValidTodo.success){
        return res.status(400).json(zodErrorHandle(isValidTodo))
    }
    const response = await createTodo({title,category,priority,dueDate,status});
    if(!response.success){
        return res.status(500).json(response.error);
    }
    res.status(201).json({"message":"todo created successfully!"});
})

router.put("/:todoId",async(req,res)=>{
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
    const response = await updateTodo(todoId,{title,category,priority,dueDate,status});
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})


router.put("/status/:todoId",async(req,res)=>{
    const todoId = req.params.todoId;
    const status = req.body.status;
    const isValidStatus = statusValidator(status);
    console.log(isValidStatus)
    if(!isValidStatus.success){
        return res.status(400).json(zodErrorHandle(isValidStatus))
    }
    const response = await updateStatus(todoId,status);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})

router.delete("/:todoId",async(req,res)=>{
    const todoId = req.params.todoId;
    const response = await deleteTodo(todoId);
    if(!response.success){
        res.status(500).json({"error": response.error})
    }
    res.status(200).json({"message":response.message});
})

module.exports = router;
