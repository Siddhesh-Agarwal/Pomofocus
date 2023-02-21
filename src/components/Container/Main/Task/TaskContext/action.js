function toAddTaskInput(data)
{
    return {
        type: 'TO_ADD_TASK_INPUT',
        data
    }
}

function toAddTask(data)
{
    return {
        type: 'TO_ADD_TASK',
        data
    }
}

function toModifyTask(data)
{
    return {
        type: 'TO_MODIFY_TASK',
        data
    }
}

function toDeleteTask(data)
{
    return {
        type: 'TO_DELETE_TASK',
        data
    }
}

export { toAddTaskInput, toAddTask, toModifyTask, toDeleteTask }