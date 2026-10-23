import React, { useState } from 'react'

const useCopy = () => {
    const [copied, setCopied] = useState(false);

    const copyText = (content) => {
        window.navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500)
        });
    }

    return { copyText, copied };
}

export default useCopy