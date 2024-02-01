import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'

import TaskModify from './TaskModify'
import { TimerContext } from '../Timer/TimerContext/context'
import { TaskContext } from './TaskContext/context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import styles from './Task.module.scss'

import * as actions from './TaskContext/action'
import * as timerActions from "../Timer/TimerContext/action"

function TaskElement({ index, handleSelect, selected, handleFinish, hasFinished, handleClose, addPopsUp }) {
    const [ taskState, taskDispatch ] = useContext(TaskContext);
    const { taskInput, tasks } = taskState;
    const [ timerState, timerDispatch ] = useContext(TimerContext);
    const { mode, click, start } = timerState;
    const { title, note, est, act } = tasks[ index ];
    const [ modify, setModify ] = useState(false);
    const handleMountModify = () => {
        setModify(!modify);
    }

    useEffect(() => {
        if (selected && mode !== 'pomodoro' && click === 'auto') {
            if (+act + 1 < +est) {
                timerDispatch(timerActions.toChangeInTask(true));
                const newAct = +act + 1;
                const newTasks = tasks;
                newTasks[ index ].act = newAct + "";

                taskDispatch(actions.toModifyTask({
                    taskInput,
                    tasks: newTasks
                }));
            } else if (+act + 1 === +est) {
                const newAct = +act + 1;
                const newTasks = tasks;
                newTasks[ index ].act = newAct + "";
                timerDispatch(timerActions.toChangeInTask(false));
                handleSelect(index + 1);
                alert('The current task has been completed, now is time to take a break');
                taskDispatch(actions.toModifyTask({
                    taskInput,
                    tasks: newTasks
                }))
            }
        }
    }, [ mode ])

    return (
        <>
            {modify && <TaskModify index={index} handleMountModify={handleMountModify} />}
            {!modify && <div
                onClick={() => handleSelect(index)}
                className={(selected) ? clsx(styles.taskElementSelected) : clsx(styles.taskElement)}
            >
                <div className={clsx(styles.taskElementBaseInfo)}>
                    <button
                        className={clsx({
                            [ styles.taskElementBaseInfoBtnFinish ]: (hasFinished >= 0)
                        })}
                        onClick={(e) => { handleFinish(index); e.stopPropagation(); }}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <h4
                        className={clsx({
                            [ styles.taskElementBaseInfoTitleFinish ]: (hasFinished >= 0)
                        })}
                    >
                        {title}
                    </h4>
                    <p>{act}<span>/ {est}</span></p>
                    <button onClick={(e) => {
                        if (addPopsUp)
                            handleClose();
                        else
                            handleMountModify();
                        e.stopPropagation();
                    }}><FontAwesomeIcon icon={faEllipsisV} /></button>
                </div>
                {
                    note && <div
                        onClick={(e) => { e.stopPropagation() }}
                        className={clsx(styles.taskElementExtendInfo)}>
                        <p>{note}</p>
                    </div>
                }
            </div>}
        </>
    )
}

export default TaskElement