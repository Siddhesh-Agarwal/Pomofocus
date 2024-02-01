import clsx from "clsx";
import styles from './HeaderStyles.module.scss';

function HomeApp() {
    return (
        <a href="#" className={clsx(styles.homeApp)}>
            <img src='https://pomofocus.io/icons/icon-white.png' alt='icon' />
            <h1>Pomofocus</h1>
        </a>
    )
}

export default HomeApp