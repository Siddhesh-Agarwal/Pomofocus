function toStart(data)
{
    return {
        type: 'TO_START',
        data
    }
}

function toChangeMode(data)
{
    return {
        type: 'TO_CHANGE_MODE',
        data
    }
}

function toToggleMode(data)
{
    return {
        type: 'TO_TOGGLE_MODE',
        data
    }
}

function toChangeInTask(data)
{
    return {
        type: 'TO_CHANGE_INTASK',
        data
    }
}

export { toChangeMode, toStart, toToggleMode, toChangeInTask }