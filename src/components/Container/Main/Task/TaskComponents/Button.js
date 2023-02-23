function Button({ handleClick, className, ...content }) {
    const arrContent = [];
    for (let prop in content) {
        arrContent.push(content[prop]);
    }

    return (
        <button
            className={className}
            onClick={handleClick}
        >
            {
                arrContent.map(el => el)
            }
        </button>
    )
}

export default Button