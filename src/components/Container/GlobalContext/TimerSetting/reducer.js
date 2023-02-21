import * as constants from './constant'

const initState = {
    pomodoro: JSON.parse(localStorage.getItem('pomodoro')) || 25,
    shortBreak: JSON.parse(localStorage.getItem('shortBreak')) || 5,
    longBreak: JSON.parse(localStorage.getItem('longBreak')) || 15,
    intervalLongBreak: JSON.parse(localStorage.getItem('intervalLongBreak')) || 1,
    autoStartBreak: JSON.parse(localStorage.getItem('startBreak')) || false,
    autoStartPomodoro: JSON.parse(localStorage.getItem('startPomodoro')) || false
}

function reducer(state, action) {
    switch (action.type) {
        case constants.TO_CHANGE_POMODORO:
            return {
                ...state,
                pomodoro: action.data
            }
        case constants.TO_CHANGE_SHORT_BREAK:
            return {
                ...state,
                shortBreak: action.data
            }
        case constants.TO_CHANGE_LONG_BREAK:
            return {
                ...state,
                longBreak: action.data
            }
        case constants.TO_CHANGE_INTERVAL_LONG_BREAK:
            return {
                ...state,
                intervalLongBreak: action.data
            }
        case constants.TO_TOGGLE_START_BREAK: {
            localStorage.setItem('startBreak', JSON.stringify(!state.autoStartBreak));
            return {
                ...state,
                autoStartBreak: !state.autoStartBreak
            }
        }
        case constants.TO_TOGGLE_START_POMODORO: {
            localStorage.setItem('startPomodoro', JSON.stringify(!state.autoStartPomodoro));
            return {
                ...state,
                autoStartPomodoro: !state.autoStartPomodoro
            }
        }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer
export { initState }