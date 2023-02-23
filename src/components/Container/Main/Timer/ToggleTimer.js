import { useEffect, useContext, useState, useLayoutEffect, useRef } from 'react'
import clsx from "clsx"

import { TimerContext } from './TimerContext/context'
import { SettingContext } from '../../GlobalContext/TimerSetting/context'
import * as action from "./TimerContext/action"

import styles from "./TimerStyles.module.scss"

function ToggleTimer() {
    const modes = ['pomodoro', 'short break', 'long break'];
    const btnRef = useRef();
    const [timerState, timerDispatch] = useContext(TimerContext);
    const { mode, start, click, inTask } = timerState;
    const [periodState] = useContext(SettingContext);
    const { pomodoro, shortBreak, longBreak, intervalLongBreak, autoStartBreak, autoStartPomodoro } = periodState;
    const [pMin, setPMin] = useState(pomodoro);
    const [sMin, setSMin] = useState(shortBreak);
    const [lMin, setLMin] = useState(longBreak);
    const [sec, setSec] = useState(0);
    const [lastMin, setLastMin] = useState(0);
    const [curr, setCurr] = useState(1);
    const handleStart = () => {
        timerDispatch(action.toStart(!start));
    }

    const handleWidthHrDiv = (prevSec, mode) => {
        const hrDiv = document.getElementById('hrDiv');
        if (mode === 'pomodoro') {
            setPMin(prevMin => {
                const lastSec = (pomodoro - prevMin - 1) * 60 + 60 - prevSec;
                hrDiv.style.width = `${lastSec * 100 / (pomodoro * 60)}%`;
                return prevMin;
            })
        } else if (mode === 'short break') {
            setSMin(prevMin => {
                const lastSec = (shortBreak - prevMin - 1) * 60 + 60 - prevSec;
                hrDiv.style.width = `${lastSec * 100 / (shortBreak * 60)}%`;
                return prevMin;
            })
        } else {
            setLMin(prevMin => {
                const lastSec = (longBreak - prevMin - 1) * 60 + 60 - prevSec;
                hrDiv.style.width = `${lastSec * 100 / (longBreak * 60)}%`;
                return prevMin;
            })
        }
    }

    useLayoutEffect(() => {
        btnRef.current.style.color = (mode === 'pomodoro') ? '#d95550' : (mode === 'short break') ? '#4c9195' : '#457ca3';
        setSec(0);
        setLastMin(0);
        document.getElementById('hrDiv').style.width = '0%';
        setCurr((prev) => {
            setTimeout(() => {
                if (mode === 'pomodoro' && autoStartPomodoro && prev > 1 && !start && click === 'auto' && inTask)
                    handleStart();
                else if (mode !== 'pomodoro' && autoStartBreak && prev > 1 && !start && click === 'auto' && inTask)
                    handleStart();
            }, 470);
            return prev;
        })
    }, [mode]);

    useLayoutEffect(() => {
        setLastMin(prevL => {
            if (pomodoro - prevL >= 0)
                setPMin(pomodoro - prevL);
            return prevL;
        })
    }, [pomodoro, mode]);

    useLayoutEffect(() => {
        setLastMin(prevL => {
            if (shortBreak - prevL >= 0)
                setSMin(shortBreak - prevL);
            return prevL;
        })
    }, [shortBreak, mode]);

    useLayoutEffect(() => {
        setLastMin(prevL => {
            if (longBreak - prevL >= 0)
                setLMin(longBreak - prevL);
            return prevL;
        })
    }, [longBreak, mode]);

    useEffect(() => {
        let index;
        (mode === 'pomodoro') ? index = 0 : (mode === 'short break') ? index = 1 : index = 2;

        if (start) {
            let timerID = setInterval(() => {
                setSec(prevSec => {
                    if (prevSec === 0)
                        handleWidthHrDiv(60, modes[index]);
                    else
                        handleWidthHrDiv(prevSec - 1, modes[index]);

                    if (index === 0 && prevSec === 0) {
                        setLastMin(prev => prev + 1);
                        setPMin(prevMin => {
                            if (prevMin === 0) {
                                setCurr((currentInterval) => {
                                    if (currentInterval % intervalLongBreak !== 0) {
                                        timerDispatch(action.toToggleMode('auto'));
                                        timerDispatch(action.toChangeMode(modes[(index + 1)]));
                                    }
                                    else {
                                        timerDispatch(action.toToggleMode('auto'));
                                        timerDispatch(action.toChangeMode(modes[(index + 2)]));
                                    }
                                    return currentInterval + 1;
                                })
                                handleStart();
                                return 0;
                            }
                            return prevMin - 1;
                        })
                        return 59;
                    } else if (index === 1 && prevSec === 0) {
                        setLastMin(prev => prev + 1);
                        setSMin(prevMin => {
                            if (prevMin === 0) {
                                timerDispatch(action.toToggleMode('auto'));
                                timerDispatch(action.toChangeMode(modes[(index - 1)]));
                                handleStart();
                                return 0;
                            }
                            return prevMin - 1;
                        })
                        return 59;
                    } else if (prevSec === 0) {
                        setLastMin(prev => prev + 1);
                        setLMin(prevMin => {
                            if (prevMin === 0) {
                                timerDispatch(action.toToggleMode('auto'));
                                timerDispatch(action.toChangeMode(modes[(index - 2)]));
                                handleStart();
                                return 0;
                            }
                            return prevMin - 1;
                        })
                        return 59;
                    }
                    return prevSec - 1;
                })
            }, 1000)
            return () => {
                clearInterval(timerID);
            }
        }
    }, [mode, start, intervalLongBreak, pomodoro, shortBreak, longBreak]);

    return (
        <div className={clsx(styles.toggleTimer)}>
            <div className={clsx(styles.showToggleTimer)}>
                {
                    (mode === 'pomodoro') ? <h1>{(pMin < 10) ? '0' + pMin : '' + pMin}</h1> : (mode === 'short break') ? <h1>{(sMin < 10) ? '0' + sMin : '' + sMin}</h1> : <h1>{(lMin < 10) ? '0' + lMin : '' + lMin}</h1>
                }
                <h1>:</h1>
                <h1>{(sec < 10) ? '0' + sec : '' + sec}</h1>
            </div>
            <button
                ref={btnRef}
                onClick={handleStart}
                className={clsx(styles.btnToggleTimer, {
                    [styles.btnActiveToggleTimer]: start
                })}
            >
                {(start) ? 'STOP' : 'START'}
            </button>
        </div>
    )
}
export default ToggleTimer