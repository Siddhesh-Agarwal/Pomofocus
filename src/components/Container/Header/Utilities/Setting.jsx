import { useState, useEffect, useRef, useContext } from 'react'
import clsx from 'clsx'

import { SettingContext } from '../../GlobalContext/TimerSetting/context'
import * as actions from '../../GlobalContext/TimerSetting/action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from '../HeaderStyles.module.scss'

function Setting({ handleClose }) {
    const [ periodState, periodDispatch ] = useContext(SettingContext);
    const { pomodoro, shortBreak, longBreak, intervalLongBreak, autoStartBreak, autoStartPomodoro } = periodState;


    const handleBreak = () => {
        periodDispatch(actions.toToggleStartBreak());
    }

    const handlePomodoro = () => {
        periodDispatch(actions.toToggleStartPomodoro());
    }

    const handleChangePomodoro = (e) => {
        if (e.target.value >= 1) {
            localStorage.setItem('pomodoro', JSON.stringify(e.target.value))
            periodDispatch(actions.toChangePomodoro(e.target.value))
        }
    }

    const handleChangeShortBreak = (e) => {
        if (e.target.value >= 1) {
            localStorage.setItem('shortBreak', JSON.stringify(e.target.value))
            periodDispatch(actions.toChangeShortBreak(e.target.value))
        }
    }

    const handleChangeLongBreak = (e) => {
        if (e.target.value >= 1) {
            localStorage.setItem('longBreak', JSON.stringify(e.target.value))
            periodDispatch(actions.toChangeLongBreak(e.target.value))
        }
    }

    const handleChangeIntervalLongBreak = (e) => {
        if (e.target.value >= 1) {
            localStorage.setItem('intervalLongBreak', JSON.stringify(e.target.value))
            periodDispatch(actions.toChangeIntervalLongBreak(e.target.value))
        }
    }

    const divRef = useRef();

    useEffect(() => {
        window.onclick = (e) => {
            if (e.target == divRef.current)
                handleClose();
        };
        return () => {
            window.onclick = () => { };
        }
    }, [])

    return (
        <div className={clsx(styles.featureDisableBg)} ref={divRef}>
            <div className={clsx(styles.setting)}>
                <div className={clsx(styles.settingTitle)}>
                    <h5>TIMER SETTING</h5>
                    <button onClick={handleClose}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                <div className={clsx(styles.settingTime)}>
                    <p>{`Time (minutes)`}</p>
                    <div>
                        <div className={clsx(styles.settingTimeElement)}>
                            <span>Pomodoro</span>
                            <input
                                min={1}
                                onChange={handleChangePomodoro}
                                value={pomodoro}
                                type='number'
                            />
                        </div>
                        <div className={clsx(styles.settingTimeElement)}>
                            <span>Short Break</span>
                            <input
                                min={1}
                                onChange={handleChangeShortBreak}
                                value={shortBreak}
                                type='number'
                            />
                        </div>
                        <div className={clsx(styles.settingTimeElement)}>
                            <span>Long Break</span>
                            <input
                                min={1}
                                onChange={handleChangeLongBreak}
                                value={longBreak}
                                type='number'
                            />
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.settingAutoStart)}>
                    <p>Auto start Breaks?</p>
                    <div onClick={handleBreak} className={clsx(styles.settingAutoStartToggle, {
                        [ styles.settingAutoStartToggleActive ]: autoStartBreak
                    })}>
                        <div />
                    </div>
                </div>
                <div className={clsx(styles.settingAutoStart)}>
                    <p>Auto start Pomodoros?</p>
                    <div onClick={handlePomodoro} className={clsx(styles.settingAutoStartToggle, {
                        [ styles.settingAutoStartToggleActive ]: autoStartPomodoro
                    })}>
                        <div />
                    </div>
                </div>
                <div className={clsx(styles.settingInterval)}>
                    <p>Long Break interval</p>
                    <input
                        min={1}
                        onChange={handleChangeIntervalLongBreak}
                        value={intervalLongBreak}
                        type='number'
                    />
                </div>
                <div className={clsx(styles.settingConfirm)}>
                    <button onClick={() => handleClose()}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Setting