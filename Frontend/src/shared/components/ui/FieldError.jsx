import React from 'react'

const FieldError = ({ error, field }) => {
    const message = error?.details?.[field];
    if (!message) return null;

    return (
        <p className='text-xs font-medium tracking-normal text-red-500'>
            {message}
        </p>
    )
}

export default FieldError