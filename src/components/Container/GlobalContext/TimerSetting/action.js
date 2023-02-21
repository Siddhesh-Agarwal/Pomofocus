function toChangePomodoro(data)
{
    return {
        type: 'TO_CHANGE_POMODORO',
        data
    }
}

function toChangeShortBreak(data)
{
    return {
        type: 'TO_CHANGE_SHORT_BREAK',
        data
    }
}

function toChangeLongBreak(data)
{
    return {
        type: 'TO_CHANGE_LONG_BREAK',
        data
    }
}

function toChangeIntervalLongBreak(data)
{
    return {
        type: 'TO_CHANGE_INTERVAL_LONG_BREAK',
        data
    }
}
function toToggleStartBreak() 
{
    return {
        type: 'TO_TOGGLE_START_BREAK',
    }
}

function toToggleStartPomodoro() 
{
    return {
        type: 'TO_TOGGLE_START_POMODORO',
    }
}

export { toChangePomodoro, toChangeShortBreak, toChangeLongBreak, toChangeIntervalLongBreak, toToggleStartBreak, toToggleStartPomodoro }