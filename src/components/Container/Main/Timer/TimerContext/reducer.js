import * as constant from './constant'

const initState = {
    mode: 'pomodoro',
    start: false,
    click: 'click',
    inTask: true
}

function reducer(state, action)
{
    switch (action.type)
    {
        case constant.TO_START:
            return {
                ...state,
                start: action.data
            }
        case constant.TO_CHANGE_MODE:
            return {
                ...state,
                mode: action.data
            }
        case constant.TO_TOGGLE_MODE:
            return {
                ...state,
                click: action.data
            }
        case constant.TO_CHANGE_INTASK:
            return {
                ...state,
                inTask: action.data
            }
        default:
            throw new Error('Invalid action')

    }
}

export default reducer
export { initState }