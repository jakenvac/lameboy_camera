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
    }: React.HTMLAttributes<HTMLCanvasElement> & CameraProps,
    ref: MutableRefObject<HTMLCanvasElement>
  ) => {
    const canvasRef = ref ?? useRef<HTMLCanvasElement>();
    const videoRef = useRef<HTMLVideoElement>();
    const [stream, setStream] = useState<MediaStream>();

    const frameIntervalMs = frameInterval || 16;

    const tearDown = () => {
      stream?.getTracks().forEach((t) => t.stop());
      stream?.getAudioTracks().forEach((t) => t.stop());
      setStream(undefined);
      videoRef.current.srcObject = undefined;
    };

    const setUp = async () => {
      console.log("setting up");
      tearDown();
      const s = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { exact: 128 },
          height: { exact: 128 },
          deviceId: deviceId,
        },
      });
      if (s && videoRef.current) {
        setStream(s);
        videoRef.current.srcObject = s;
      }
    };

    const updateFrame = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 128, 128);
    };

    const frameTimer = () => {
      updateFrame();
      setTimeout(() => frameTimer(), frameIntervalMs);
    };

    useEffect(() => {
      setUp();
      frameTimer();
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
          hidden
        />
        <canvas ref={canvasRef} {...props} />
      </>
    );
  }
);
export default Camera;
