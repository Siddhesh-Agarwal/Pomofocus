import { useState } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Button from './Utilities/Button'
import Setting from './Utilities/Setting'
import styles from './HeaderStyles.module.scss'

function Utilities() {
    const [state, setState] = useState();
    const handleOnClick = (buttonRef) => setState(buttonRef);
    const handleClose = () => setState(undefined);

    return (
        <>
            <div className={clsx(styles.utilities)}>
                <Button spanId='settingSpan' mainId='setting' handleOnClick={handleOnClick} content={'Setting'} className={clsx(styles.utilitiesBtn)} icon={<FontAwesomeIcon id='settingIcon' icon={faCog} className={clsx(styles.utilitiesIcon)} />} />
            </div>
            {(state === 'Setting') && <Setting handleClose={handleClose} />}
        </>
    )
}

export default Utilities