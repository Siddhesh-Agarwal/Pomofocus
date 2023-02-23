import { useContext, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import { TaskContext } from './TaskContext/context'
import { CButtonTask, CInputTask } from './TaskComponents'
import * as actions from './TaskContext/action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faLock } from '@fortawesome/free-solid-svg-icons'

import styles from './Task.module.scss'

function TaskInput({ handleClose }) {
    const [taskState, taskDispatch] = useContext(TaskContext);
    const { taskInput, tasks } = taskState;
    const titleRef = useRef();
    const [isNote, setIsNote] = useState(false);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    const handleInputTitle = (value) => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { ...taskInput, title: value }
        }));
    }

    const handleInputEst = (value) => {
        if (value >= 0) {
            taskDispatch(actions.toAddTaskInput({
                ...taskState,
                taskInput: { ...taskInput, est: value }
            }));
        }
    }

    const handleInputNote = (value) => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { ...taskInput, note: value }
        }));
    }

    const handleAddTask = () => {
        if (taskInput.title && taskInput.est) {

            const newTasks = [...tasks, {
                title: taskInput.title,
                note: taskInput.note,
                est: taskInput.est,
                act: taskInput.act
            }];

            taskDispatch(actions.toAddTask({
                tasks: [...newTasks],
                taskInput: {
                    title: '',
                    note: '',
                    est: 1,
                    act: 0
                }
            }));

            localStorage.setItem('tasks', JSON.stringify(newTasks));

            if (isNote) {
                handleAddNote();
            }
        }
    }

    const handleAddNote = () => {
        setIsNote(!isNote);
    }

    useEffect(() => {
        titleRef.current.focus();
        window.onclick = () => {
            handleClose();
        };

        return () => {
            window.onclick = () => { };
        }
    }, [])

    useEffect(() => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { title: '', note: '', est: 1, act: 0 }
        }));
    }, [])

    return (
        <div
            tabIndex={1}
            onClick={(e) => { e.stopPropagation() }}
            className={clsx(styles.taskInput)}
        >
            <div className={clsx(styles.taskInputInfo)}>
                <div className={clsx(styles.taskInputInfoTitle)}>
                    <CInputTask
                        ref={titleRef}
                        type='text'
                        placeholder="What are you working on?"
                        value={taskInput.title}
                        handleChange={handleInputTitle}
                    />
                </div>
                <div className={clsx(styles.taskInputInfoEst)}>
                    <span>Est Pomodoros</span>
                    <div>
                        <CInputTask
                            type='number'
                            value={taskInput.est}
                            handleChange={handleInputEst}
                            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                        />
                        <CButtonTask
                            handleClick={() => { handleInputEst(+taskInput.est + 1) }}
                            icon={
                                <FontAwesomeIcon
                                    onClick={e => {
                                        handleInputEst(+taskInput.est + 1);
                                        e.stopPropagation();
                                    }}
                                    icon={faCaretUp}
                                />
                            }
                        />
                        <CButtonTask
                            handleClick={() => { handleInputEst(+taskInput.est - 1) }}
                            icon={
                                <FontAwesomeIcon
                                    onClick={e => {
                                        handleInputEst(+taskInput.est - 1);
                                        e.stopPropagation();
                                    }}
                                    icon={faCaretDown}
                                />
                            }
                        />
                    </div>
                </div>
                {isNote && <div>
                    <textarea
                        className={clsx(styles.taskInputInfoExtendText)}
                        autoFocus
                        placeholder='Some notes... (optional)'
                        onChange={(e) => { handleInputNote(e.target.value) }}
                    ></textarea>
                </div>}
                <div className={clsx(styles.taskInputInfoExtend)}>
                    {!isNote && <span
                        onClick={handleAddNote}
                    >
                        + Add Note
                    </span>}
                    <span>+ Add Project<FontAwesomeIcon
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        icon={faLock}
                    /></span>
                </div>
            </div>
            <div className={clsx(styles.taskInputSubmit)} >
                <div></div>
                <div>
                    <CButtonTask
                        handleClick={() => handleClose()}
                        text={'Cancel'}
                    />
                    <CButtonTask
                        className={clsx({
                            [styles.taskInputSubmitBtnActive]: taskInput.title && taskInput.est,
                            [styles.taskInputSubmitBtnUnActive]: !taskInput.title || !taskInput.est
                        })}
                        handleClick={handleAddTask}
                        text={`Save`}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskInput