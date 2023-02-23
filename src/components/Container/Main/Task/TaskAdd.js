import { useContext, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { SettingContext } from '../../GlobalContext/TimerSetting/context'
import { TaskContext } from './TaskContext/context'
import { TaskSelected } from '../../GlobalContext/TimerSetting/context';
import TaskInput from './TaskInput';
import TaskElement from './TaskElement';
import { CButtonTask } from './TaskComponents';
import * as actions from './TaskContext/action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus, faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt, faSave } from '@fortawesome/free-regular-svg-icons';
import styles from './Task.module.scss'

function TaskAdd() {
    const [taskState, taskDispatch] = useContext(TaskContext);
    const { tasks } = taskState;

    const [selected, setSelected] = useContext(TaskSelected);

    const [periodState] = useContext(SettingContext);
    const { pomodoro, shortBreak, longBreak, intervalLongBreak } = periodState;

    const [finish, setFinish] = useState(() => {
        const finish = JSON.parse(localStorage.getItem('finish'));
        return finish || [];
    });
    const [addPopsUp, setAddPopsUp] = useState(false);
    const [menu, setMenu] = useState(false);

    const menuRef = useRef();

    const estSum = tasks.reduce((sum, { est }, index) => {
        if (finish.indexOf(index) === -1)
            return sum + (+est);
        else return sum;
    }, 0);

    const actSum = tasks.reduce((sum, { act }, index) => {
        if (finish.indexOf(index) === -1)
            return sum + (+act);
        else return sum;
    }, 0);


    const calc = (estSum, actSum) => {
        const currentDate = new Date();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();

        let sum = estSum - actSum;

        let longBreakTime = Math.trunc((sum - 1) / intervalLongBreak);
        if (longBreakTime < 0) longBreakTime = 0;

        let shortBreakTime = (sum - 1) - longBreakTime;
        if (shortBreakTime < 0) shortBreakTime = 0;

        const finishTime = sum * pomodoro + shortBreakTime * shortBreak + longBreakTime * longBreak;

        let result = [];
        if (currentMinutes + finishTime > 59) {
            const minAdd = Math.trunc((currentMinutes + finishTime) / 60);
            const hoursAdd = minAdd - Math.trunc(minAdd / 24) * 24;

            (currentHours + hoursAdd > 23) ? result.push(currentHours + hoursAdd - 24) : result.push(currentHours + hoursAdd);

            result.push(currentMinutes + finishTime - 60 * minAdd);
        } else {
            result.push(currentHours);
            result.push(currentMinutes + finishTime);
        }
        return result.map(el => {
            if (el < 10)
                return `0${el}`;
            else return el;
        });
    }

    const handleOnClick = () => {
        setAddPopsUp(!addPopsUp);
    }

    const handleSelect = (index) => {
        localStorage.setItem('selected', JSON.stringify(index));
        setSelected(index);
    }

    const handleFinish = (index) => {
        if (finish.indexOf(index) >= 0) {
            const newFinish = finish;
            newFinish.splice(finish.indexOf(index), 1);
            localStorage.setItem('finish', JSON.stringify(newFinish));
            setFinish([...newFinish]);
        }
        else {
            setFinish(prev => {
                const newFinish = [...prev, index];
                localStorage.setItem('finish', JSON.stringify(newFinish));
                return newFinish;
            });
        }
    }

    const handleToggleMenu = () => {
        setMenu(!menu);
    }

    useEffect(() => {
        window.onclick = () => {
            if (menu)
                handleToggleMenu();
        };

        return () => {
            window.onclick = () => { };
        }
    }, [menu]);

    const handleClearAll = () => {
        const confirm = window.confirm('Are you sure you want to delete all tasks?');
        if (confirm) {
            localStorage.setItem('tasks', JSON.stringify([]));
            localStorage.setItem('selected', JSON.stringify(0));
            localStorage.setItem('finish', JSON.stringify([]));
            taskDispatch(actions.toModifyTask({
                tasks: [],
                taskInput: {
                    title: '',
                    note: '',
                    est: 1,
                    act: 0
                }
            }));
            setSelected(0);
        } else {
            return;
        }
    }

    const handleClearAct = () => {
        const newTasks = tasks.map(({ title, note, est, act }) => ({ title, note, est, act: 0 }));
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        taskDispatch(actions.toModifyTask({
            tasks: newTasks,
            taskInput: {
                title: '',
                note: '',
                est: 1,
                act: 0
            }
        }));
    }

    const handleClearFinished = () => {
        const newTasks = tasks.filter(({ act, est }) => act !== est);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        localStorage.setItem('finish', JSON.stringify([]));
        taskDispatch(actions.toModifyTask({
            tasks: newTasks,
            taskInput: {
                title: '',
                note: '',
                est: 1,
                act: 0
            }
        }));
    }

    return (
        <div>
            <div className={clsx(styles.taskAddTitle)}>
                <p>Tasks</p>
                <CButtonTask
                    icon={
                        <FontAwesomeIcon icon={faEllipsisV} />
                    }
                    handleClick={handleToggleMenu}
                />
                {
                    menu && <div
                        onClick={(e) => { e.stopPropagation() }}
                        className={clsx(styles.taskAddTitleMenu)}
                        ref={menuRef}
                    >
                        <div
                            onClick={() => { handleClearFinished(); handleToggleMenu(); }}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            Clear finished tasks
                        </div>
                        <div
                            onClick={() => { handleClearAct(); handleToggleMenu(); }}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                            Clear act pomodoros
                        </div>
                        <div><FontAwesomeIcon icon={faSave} />Save as template</div>
                        <div><FontAwesomeIcon icon={faPlus} />Add from templates</div>
                        <div
                            onClick={() => { handleClearAll(); handleToggleMenu(); }}
                            className={clsx(styles.taskAddTitleMenuClearAllTask)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            Clear all tasks
                        </div>
                    </div>
                }
            </div>
            {
                tasks.length > 0 && <div className={clsx(styles.taskElements)}>
                    {tasks.map((el, index) =>
                    (
                        <TaskElement
                            task={el}
                            key={index}
                            index={index}
                            handleSelect={handleSelect}
                            selected={index === selected}
                            handleFinish={handleFinish}
                            hasFinished={finish.indexOf(index)}
                            addPopsUp={addPopsUp}
                        />
                    )
                    )}
                </div>
            }
            {!addPopsUp && <div className={clsx(styles.taskAddToggle)}>
                <CButtonTask
                    handleClick={handleOnClick}
                    icon={
                        <FontAwesomeIcon icon={faPlusCircle} className={clsx(styles.taskAddIcon)} />
                    }
                    text={<span>Add Task</span>}
                />
            </div>}
            {addPopsUp && <TaskInput handleClose={handleOnClick} />}
            {tasks.length > 0 && <div className={clsx(styles.taskTotalInfo)}>
                <p>Est:<span>{estSum}</span></p>
                <p>Act:<span>{actSum}</span></p>
                <p>Finish at<span>{calc(estSum, actSum).join(':')}</span> (predict)</p>
            </div>
            }
        </div>
    )
}

export default TaskAdd