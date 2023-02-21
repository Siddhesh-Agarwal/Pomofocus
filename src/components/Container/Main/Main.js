import clsx from 'clsx'

import Timer from './Timer/Timer'
import Task from './Task/Task'
import TaskProvider from './Task/TaskContext/Provider'
import SelectedProvider from '../GlobalContext/TimerSetting/SelectedProvider'

import styles from './MainStyles.module.scss'

function Main()
{
    return (
        <div>
            <div className={clsx(styles.main)}>
                <SelectedProvider>
                    <TaskProvider>
                        <Timer />
                        <Task />
                    </TaskProvider>
                </SelectedProvider>
            </div>
        </div>
    );
}
export default Main