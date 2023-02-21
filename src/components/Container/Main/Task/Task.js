import clsx from 'clsx';

import TaskAdd from "./TaskAdd"
import TaskNotification from "./TaskNotification"
import SelectedProvider from '../../GlobalContext/TimerSetting/SelectedProvider'

import styles from './Task.module.scss'


function Task()
{
    return (
        <div className={clsx(styles.task)}>
            <SelectedProvider>
                <TaskNotification />
                <TaskAdd />
            </SelectedProvider>
        </div>
    )
}
export default Task