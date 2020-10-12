import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { styled } from 'styled-components';

const app = document.getElementById('app');

const useUserMedia = (constraints: MediaStreamConstraints) => {
    const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(undefined);

    useEffect(() => {
        const enableStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setMediaStream(stream);
        }

        if (!mediaStream) {
            enableStream();
        } else {
            return () => {
                mediaStream.getTracks().forEach(t => {
                    t.stop();
                })
            }
        }

    }, [mediaStream, constraints]);

    return mediaStream;
}

const Camera = () => {
    const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;
    const mediaStream = useUserMedia({
        audio: false,
        video: { facingMode: "environment" }
    });

    if (mediaStream && videoRef.current && !videoRef.current.srcObject)
        videoRef.current.srcObject = mediaStream;

    return <video style={{maxWidth: '128px', maxHeight: '128px'}} ref={videoRef} onCanPlay={() => videoRef.current?.play()} />
}

const Root = () => {

    return <Camera />;
};

render(<Root />, app);
