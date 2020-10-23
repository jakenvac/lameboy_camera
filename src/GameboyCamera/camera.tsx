import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type CameraProps = {
  deviceId?: string;
  frameInterval?: number;
};

const Camera = React.forwardRef(
  (
    {
      deviceId,
      frameInterval,
      ...props
    }: React.HTMLAttributes<HTMLVideoElement> & CameraProps,
    ref: MutableRefObject<HTMLVideoElement>
  ) => {
    const videoRef = ref ?? useRef<HTMLVideoElement>();
    const [stream, setStream] = useState<MediaStream>();

    const tearDown = () => {
      stream?.getTracks().forEach((t) => t.stop());
      stream?.getAudioTracks().forEach((t) => t.stop());
      setStream(undefined);
      videoRef.current.srcObject = undefined;
    };

    const setUp = async () => {
      tearDown();
      const s = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: deviceId,
        },
      });
      if (s && videoRef.current) {
        setStream(s);
        videoRef.current.srcObject = s;
      }
    };

    useEffect(() => {
      setUp();
      return tearDown();
    }, [deviceId]);

    return (
      <>
        <video
          ref={videoRef}
          onCanPlay={() => {
            videoRef.current?.play();
          }}
          autoPlay
          playsInline
          muted
          {...props}
        />
      </>
    );
  }
);
export default Camera;
