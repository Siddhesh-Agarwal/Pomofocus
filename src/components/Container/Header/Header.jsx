import { forwardRef } from 'react'
import clsx from "clsx"

import HomeApp from "./HomeApp"
import Utilities from "./Utilities"

import styles from './HeaderStyles.module.scss'

function Header() {
    return (
        <header className={clsx(styles.header)}>
            <div className={clsx(styles.headerNav)}>
                <HomeApp />
                <Utilities />
            </div>
            <div className={clsx(styles.headerHrDiv)} >
                <div id='hrDiv' />
            </div>
        </header>
    )
}
export default forwardRef(Header)