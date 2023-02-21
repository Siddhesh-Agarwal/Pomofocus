import { useContext, useLayoutEffect } from 'react';
import { TimerContext } from '../../Main/Timer/TimerContext/context';

function Button({ mainId, spanId, handleOnClick, className, icon, content }) {
    const [ timerState, timerDispatch ] = useContext(TimerContext);
    const { mode } = timerState;

    const handleHoverColor = (color, icon, btnSpan) => {
        icon.style.color = color;
        btnSpan.style.color = color;
    }

    useLayoutEffect(() => {
        const id = document.getElementById(`${mainId}`);
        const spanId = document.getElementById(`${mainId}Span`);
        const iconId = document.getElementById(`${mainId}Icon`);

        if (mode === 'pomodoro') {
            id.addEventListener('mouseout', () => handleHoverColor('#fff', iconId, spanId))
            id.addEventListener('mouseover', () => handleHoverColor('#d95550', iconId, spanId))
        } else if (mode === 'short break') {
            id.addEventListener('mouseout', () => handleHoverColor('#fff', iconId, spanId))
            id.addEventListener('mouseover', () => handleHoverColor('#4c9195', iconId, spanId))
        } else if (mode === 'long break') {
            id.addEventListener('mouseout', () => handleHoverColor('#fff', iconId, spanId))
            id.addEventListener('mouseover', () => handleHoverColor('#457ca3', iconId, spanId))
        }
    }, [ mode ])

    return (
        <button
            id={mainId}
            onClick={() => handleOnClick(content)}
            className={className}
        >
            {icon}
            <span id={spanId}>{content}</span>
        </button>
    )
}

export default Button