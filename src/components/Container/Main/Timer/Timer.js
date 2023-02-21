import clsx from "clsx"

import ToggleTimer from "./ToggleTimer"
import TimePeriods from "./TimePeriods"

import styles from "./TimerStyles.module.scss"

function Timer({ hrDivRef })
{
    return (
        <div className={clsx(styles.timer)}>
            <TimePeriods />
            <ToggleTimer hrDivRef={hrDivRef} />
        </div>
    )
}

export default Timer