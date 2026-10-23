import { Whistle } from 'cactus-needle/browser';

const speech = new Whistle();

let voiceInput;
let mediaRecorder;
let chunks = [];

const initMediaRecorder = async (setUserMessage) => {
    voiceInput = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(voiceInput);

    mediaRecorder.ondataavailable = async (e) => {
        chunks.push(e.data);
    }

    mediaRecorder.onstop = () => {
        audioToTranscript(setUserMessage)
    };
}

const startVoiceInput = () => {
    if (!mediaRecorder || mediaRecorder.state !== "inactive") {
        console.log("Recorder not ready yet");
        return;
    }

    chunks = [];
    mediaRecorder.start();
    console.log("recording started");
}

const stopVoiceInput = () => {
    if (!mediaRecorder || mediaRecorder.state !== "recording") return;
    mediaRecorder.stop();
    console.log("recording stopped");
}

const audioToTranscript = async (setUserMessage) => {
    const audioContext = new AudioContext();
    try {
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType });

        // Decode WebM/Opus (or the browser's recorded format) into PCM.
        const audioBuffer = await audioContext.decodeAudioData(
            await blob.arrayBuffer()
        );

        // Mix all channels into one mono Float32Array.
        const mono = new Float32Array(audioBuffer.length);

        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            const samples = audioBuffer.getChannelData(channel);

            for (let i = 0; i < samples.length; i++) {
                mono[i] += samples[i] / audioBuffer.numberOfChannels;
            }
        }

        for (let i = 0; i < mono.length; i++) {
            if (!Number.isFinite(mono[i])) {
                mono[i] = 0;
            } else {
                mono[i] = Math.max(-1, Math.min(1, mono[i]));
            }
        }

        const result = await speech.transcribe(
            { samples: mono, sampleRate: audioBuffer.sampleRate },
            { language: "en" }
        );
        setUserMessage(prev => `${prev} ${result.text}`);
    } catch (err) {
        console.log(err);
    } finally {
        audioContext.close();
    }
}

export { initMediaRecorder, startVoiceInput, stopVoiceInput }