import { useReducer } from 'react'

import { TimerContext } from './context'
import reducer, { initState } from './reducer'

function Provider({ children })
{
    const [ timerState, timerDispatch ] = useReducer(reducer, initState);

    return (
        <TimerContext.Provider value={[ timerState, timerDispatch ]}>
            {children}
        </TimerContext.Provider>
    )
}

export default Provider