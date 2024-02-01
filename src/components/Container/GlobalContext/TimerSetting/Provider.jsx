import { useReducer } from "react"

import { SettingContext } from "./context"
import reducer, { initState } from "./reducer"

function Provider({ children })
{
    const [ periodState, periodDispatch ] = useReducer(reducer, initState);

    return (
        <SettingContext.Provider value={[ periodState, periodDispatch ]}>
            {children}
        </SettingContext.Provider>
    )
}

export default Provider