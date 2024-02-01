import { useContext, useLayoutEffect } from "react"
import clsx from "clsx"
import { TimerContext } from "./TimerContext/context"
import * as action from "./TimerContext/action"
import styles from "./TimerStyles.module.scss"

function TimePeriods() {
    const [timerState, timerDispatch] = useContext(TimerContext);
    const { start, mode } = timerState;

    useLayoutEffect(() => {
        if (mode === 'pomodoro') {
            document.body.style.backgroundColor = '#d95550';
        }
        if (mode === 'short break') {
            document.body.style.backgroundColor = '#4c9195';
        }
        if (mode === 'long break') {
            document.body.style.backgroundColor = '#457ca3';
        }
    }, [mode])

    const handleActive = (modeActive) => {
        if (start) {
            if (!window.confirm('The timer is still running, are you sure you want to switch?')) {
                return;
            }
        }
        if (modeActive === 'pomodoro')
            document.body.style.backgroundColor = '#d95550';
        if (modeActive === 'short break')
            document.body.style.backgroundColor = '#4c9195';
        if (modeActive === 'long break')
            document.body.style.backgroundColor = '#457ca3';
        timerDispatch(action.toChangeMode(modeActive));
        timerDispatch(action.toToggleMode('click'));
        if (start)
            timerDispatch(action.toStart(!start));
    }

    return (
        <div className={clsx(styles.timePeriods)}>
            <button
                onClick={() => handleActive('pomodoro')}
                className={clsx(styles.btnTimePeriods, {
                    [styles.btnActiveTimePeriods]: (mode === 'pomodoro')
                })}
            >
                Pomodoro
            </button>
            <button
                onClick={() => handleActive('short break')}
                className={clsx(styles.btnTimePeriods, {
                    [styles.btnActiveTimePeriods]: (mode === 'short break')
                })}
            >
                Short Break
            </button>
            <button
                onClick={() => handleActive('long break')}
                className={clsx(styles.btnTimePeriods, {
                    [styles.btnActiveTimePeriods]: (mode === 'long break')
                })}
            >
                Long Break
            </button>
        </div>
    )
}

export default TimePeriods