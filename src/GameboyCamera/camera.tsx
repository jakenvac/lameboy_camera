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
    const [stream, setStream] = useState<MediaStream>();

    const tearDown = () => {
      stream?.getTracks().forEach((t) => t.stop());
    };

    useEffect(() => {
      if (stream) tearDown();
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: { exact: 128 },
            height: { exact: 128 },
            deviceId: deviceId,
          },
        })
        .then((s) => setStream(s));
      return tearDown();
    }, [deviceId]);

    if (videoRef.current && !videoRef.current.srcObject && stream)
      videoRef.current.srcObject = stream;

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
