import { useContext } from 'react'
import clsx from 'clsx';
import { TimerContext } from '../Timer/TimerContext/context'
import { TaskContext } from './TaskContext/context'
import { TaskSelected } from '../../GlobalContext/TimerSetting/context';
import styles from './Task.module.scss'

function TaskNotification() {
    const [timerState] = useContext(TimerContext);
    const { mode } = timerState;
    const [taskState] = useContext(TaskContext);
    const { tasks } = taskState;
    const [selected] = useContext(TaskSelected);
    const title = tasks.filter((el, index) => selected === index);

    return (
        <div className={clsx(styles.taskNotification)}>
            <span>#{(title.length > 0) ? (+title[0]?.act + 1) : 1}</span>
            {
                (title.length > 0) ? title.map(({ title }, index) => <p key={index}>{title}</p>) : <p>{(mode === 'pomodoro') ? 'Time to focus!' : 'Time for a break!'}</p>
            }
        </div>
    )
}

export default TaskNotification