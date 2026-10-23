import React from 'react'

const Button = ({ className, props = {} }) => {
    const { title, icon, type, styles } = props;
    return (

        <button
            title={title}
            aria-label={title}
            type={type}
            className={`flex h-9 w-9 items-center justify-center rounded-xl
                 text-zinc-500 transition hover:bg-zinc-100 ${styles} ${className} `}
        >
            {icon}
        </button>
    )
}

export default Button