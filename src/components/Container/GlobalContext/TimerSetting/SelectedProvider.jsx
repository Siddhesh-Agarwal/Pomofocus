import { useState } from "react";

import { TaskSelected } from './context'

function SelectedProvider({ children }) {
    const [ selected, setSelected ] = useState(() => {
        const selected = JSON.parse(localStorage.getItem('selected'));
        return selected;
    });
    return (
        <TaskSelected.Provider value={[ selected, setSelected ]} >
            {children}
        </TaskSelected.Provider>
    )
}

export default SelectedProvider