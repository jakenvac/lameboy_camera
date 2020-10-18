import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type CameraProps = {
  deviceId?: string;
};

const Camera = React.forwardRef(
  (
    {
      deviceId,
      ...props
    }: React.HTMLAttributes<HTMLVideoElement> & CameraProps,
    ref: MutableRefObject<HTMLVideoElement>
  ) => {
    const videoRef = ref ?? useRef<HTMLVideoElement>();
    const stream = useRef<MediaStream>();

    const setUp = async () => {
      if (stream) tearDown();
      const s = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { exact: 128 },
          height: { exact: 128 },
          deviceId: deviceId,
        },
      });
      if (s && videoRef.current) {
        stream.current = s;
        videoRef.current.srcObject = s;
      }
    };

    const tearDown = () => {
      stream.current?.getTracks().forEach((t) => t.stop());
    };

    useEffect(() => {
      setUp();
      return tearDown();
    }, [deviceId]);

    return (
      <video
        ref={videoRef}
        onCanPlay={() => videoRef.current?.play()}
        autoPlay
        playsInline
        muted
        {...props}
      />
    );
  }
);
export default Camera;
