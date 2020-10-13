import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useUserMedia from "./useUserMedia";

const Camera = React.forwardRef(
  (
    props: React.HTMLAttributes<HTMLVideoElement>,
    ref: MutableRefObject<HTMLVideoElement>
  ) => {
    const videoRef = ref ?? useRef<HTMLVideoElement>();
    const [stream, setStream] = useState<MediaStream>();

    const tearDown = () => {
      stream?.getTracks().forEach((t) => t.stop());
    };

    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: { width: { exact: 128 }, height: { exact: 128 } },
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
