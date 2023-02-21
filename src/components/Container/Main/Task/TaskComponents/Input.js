import { useRef, forwardRef, useImperativeHandle } from 'react'

function Input({ type, placeholder, value, handleChange, className, style }, ref)
{
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus()
        {
            inputRef.current.focus();
        }
    }))

    return (
        <input
            style={style}
            className={className}
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}

export default forwardRef(Input)