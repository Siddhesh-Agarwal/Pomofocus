import { useRef, useEffect } from 'react'

import Header from './Header/Header'
import Main from './Main/Main'
import PeriodProvider from './GlobalContext/TimerSetting/Provider'
import TimerProvider from './Main/Timer/TimerContext/Provider'
import './styles.scss'

function Container() {
    const hrDivRef = useRef();
    useEffect(() => {
        return () => {
            hrDivRef.current = null;
        }
    }, [])

    return (
        <div>
            <PeriodProvider>
                <TimerProvider>
                    <Header />
                    <Main />
                </TimerProvider>
            </PeriodProvider>
        </div>
    )
}

export default Container