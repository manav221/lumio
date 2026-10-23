import { useState, useEffect } from 'react'
import { initMediaRecorder, startVoiceInput, stopVoiceInput } from '../services/voiceInput.service'

const useVoiceInput = (setUserMessage) => {
    const [isRecord, setIsRecord] = useState(false);

    useEffect(() => {
        initMediaRecorder(setUserMessage);
    }, [])


    const handleVoiceInput = () => {
        if (isRecord) {
            setIsRecord(false);
            stopVoiceInput();
        }
        else {
            setIsRecord(true);
            startVoiceInput();
        }
    }

    return { isRecord, handleVoiceInput }
}

export default useVoiceInput