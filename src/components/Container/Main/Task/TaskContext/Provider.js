import { useReducer } from "react";

import { TaskContext } from './context'
import reducer, { initState } from "./reducer";

function Provider({ children })
{
    const [ taskState, taskDispatch ] = useReducer(reducer, initState);
    return (
        <TaskContext.Provider value={[ taskState, taskDispatch ]} >
            {children}
        </TaskContext.Provider>
    )
}

export default Provider