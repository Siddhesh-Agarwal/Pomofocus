import { useContext, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import { TaskSelected } from '../../GlobalContext/TimerSetting/context';
import { TaskContext } from './TaskContext/context'
import { CButtonTask, CInputTask } from './TaskComponents'
import * as actions from './TaskContext/action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faLock } from '@fortawesome/free-solid-svg-icons'

import styles from './Task.module.scss'

function TaskModify({ index, handleMountModify }) {
    const [ taskState, taskDispatch ] = useContext(TaskContext);
    const { taskInput, tasks } = taskState;

    const [ selected, setSelected ] = useContext(TaskSelected);

    const { title, note, est, act } = tasks[ index ];

    const titleRef = useRef();
    const [ isNote, setIsNote ] = useState(() => {
        return (tasks[ index ].note) ? true : false;
    });

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    const handleAddNote = () => {
        setIsNote(!isNote);
    }

    const handleModifyTitle = (value) => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { ...taskInput, title: value }
        }));
    }

    const handleModifyNote = (value) => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { ...taskInput, note: value }
        }));
    }

    const handleModifyEst = (value) => {
        if (value >= 0) {
            taskDispatch(actions.toAddTaskInput({
                ...taskState,
                taskInput: { ...taskInput, est: value }
            }));
        }
    }

    const handleModifyAct = (value) => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { ...taskInput, act: value }
        }));
    }

    const handleSubmitModify = () => {
        if ((taskInput.est && taskInput.title) && (taskInput.title !== title || taskInput.est !== est || taskInput.note !== note || taskInput.act !== act)) {
            const newTasks = tasks;
            newTasks.splice(index, 1, taskInput);

            taskDispatch(actions.toModifyTask({
                tasks: newTasks,
                taskInput: {
                    title: '',
                    note: '',
                    est: 1,
                    act: 0
                }
            }))

            localStorage.setItem('tasks', JSON.stringify(newTasks));

            handleMountModify();
        }
    }

    const handleDeleteTask = () => {
        const newTasks = tasks;
        newTasks.splice(index, 1);

        setSelected(() => {
            if (selected > index) {
                localStorage.setItem('selected', JSON.stringify(selected - 1));
                return selected - 1;
            }
            else if (selected < index) {
                localStorage.setItem('selected', JSON.stringify(selected));
                return selected;
            }
            else {
                if (selected >= newTasks.length) {
                    localStorage.setItem('selected', JSON.stringify(selected - 1));
                    return selected - 1;
                }
                localStorage.setItem('selected', JSON.stringify(selected));
                return selected;
            }
        })

        taskDispatch(actions.toDeleteTask({
            tasks: newTasks,
            taskInput: {
                title: '',
                note: '',
                est: 1,
                act: 0
            }
        }));

        localStorage.setItem('tasks', JSON.stringify(newTasks));

        handleMountModify();
    }

    useEffect(() => {
        titleRef.current.focus();
        window.onclick = () => {
            if (window.confirm('The change will be lost. Are you sure you want to close it?'))
                handleMountModify();
        };

        return () => {
            window.onclick = () => { };
        }
    }, [])

    useEffect(() => {
        taskDispatch(actions.toAddTaskInput({
            ...taskState,
            taskInput: { title, note, est, act }
        }));

        return () => {
            taskDispatch(actions.toAddTaskInput({
                ...taskState,
                taskInput: { title: '', note: '', est: 1, act: 0 }
            }));
        }
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
                        handleChange={handleModifyTitle}
                    />
                </div>
                <div className={clsx(styles.taskInputInfoEst)}>
                    <span>Act / Est Pomodoros</span>
                    <div>
                        <CInputTask
                            type='number'
                            value={taskInput.act}
                            handleChange={handleModifyAct}
                        />
                        <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>/</span>
                        <CInputTask
                            type='number'
                            value={taskInput.est}
                            handleChange={handleModifyEst}
                        />
                        <CButtonTask
                            handleClick={() => { handleModifyEst(+taskInput.est + 1) }}
                            icon={
                                <FontAwesomeIcon
                                    onClick={e => {
                                        handleModifyEst(+taskInput.est + 1);
                                        e.stopPropagation();
                                    }}
                                    icon={faCaretUp}
                                />
                            }
                        />
                        <CButtonTask
                            handleClick={() => { handleModifyEst(+taskInput.est - 1) }}
                            icon={
                                <FontAwesomeIcon
                                    onClick={e => {
                                        handleModifyEst(+taskInput.est - 1);
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
                        onChange={(e) => { handleModifyNote(e.target.value) }}
                        value={taskInput.note}
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
                <div>
                    <CButtonTask
                        handleClick={handleDeleteTask}
                        text={'Delete'}
                    />
                </div>
                <div>
                    <CButtonTask
                        handleClick={handleMountModify}
                        text={'Cancel'}
                    />
                    <CButtonTask
                        className={clsx(styles.taskInputSubmitBtnUnActive, {
                            [ styles.taskInputSubmitBtnActive ]: (taskInput.est && taskInput.title) && (taskInput.title !== title || taskInput.est !== est || taskInput.note !== note || taskInput.act !== act)
                        })}
                        handleClick={handleSubmitModify}
                        text={`Save`}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskModify