import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useUserMedia from "./useUserMedia";

type CameraProps = {
  facing?: "user" | "environment";
};

const Camera = React.forwardRef(
  (
    { facing, ...props }: React.HTMLAttributes<HTMLVideoElement> & CameraProps,
    ref: MutableRefObject<HTMLVideoElement>
  ) => {
    const videoRef = ref ?? useRef<HTMLVideoElement>();
    const [stream, setStream] = useState<MediaStream>();

    facing = facing ?? "user";

    const tearDown = () => {
      stream?.getTracks().forEach((t) => t.stop());
    };

    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: { exact: 128 },
            height: { exact: 128 },
            facingMode: facing,
          },
        })
        .then((s) => setStream(s));
      return tearDown();
    }, []);

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
