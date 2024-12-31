const { CreateCustomError } = require("../errors/custom-error")
const asyncWrapper = require("../middleware/async")
const Task = require("../models/Task")

const getAllTasks = asyncWrapper( async(req , res) => {
    const tasks = await Task.find({})
    res.status(201).json( {nbHits :tasks.length  ,tasks})
})

const createTask = asyncWrapper(async (req , res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})           
})

const getTask =  asyncWrapper(async (req , res , next) => {    
    const {id : taskID} = req.params;
    const task = await Task.findOne({_id:taskID})

    if(!task) {
        return next(CreateCustomError(`No Task wiht Id : ${taskID}` , 404))
        // return res.status(500).json({msg : `There is no task with id : ${taskID}`})
    }

    res.status(200).json({task})    
})

const updateTask = asyncWrapper(async (req , res , next) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID} , req.body , {
        new : true ,
        runValidators : true
    })
    if(!task){
        return next(CreateCustomError(`No Task With ID : ${taskID}` , 404))
        // return res.status(500).json({msg : `No task with id ${taskID}`})
    }
    res.status(201).json({task})  
})

const deleteTask = asyncWrapper (async (req , res , next) => {
    const {id : taskID} = req.params
    const task = await Task.findByIdAndDelete({_id: taskID})

    if(!task){
        return next(CreateCustomError(`No Task With ID : ${taskID}` , 404))
        // return res.status(500).json({msg : `No Task With id ${taskID}`})
    }

    res.status(201).json({task})
})



module.exports= {getAllTasks , createTask , getTask , updateTask , deleteTask}