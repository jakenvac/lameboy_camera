import { useEffect, useState } from "react";

const useUserMedia = (constraints: MediaStreamConstraints, deps?: any[]) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(
    undefined
  );

  const dependencies = [mediaStream, constraints];
  dependencies.push(...deps);

  useEffect(() => {
    const enableStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
    };

    if (!mediaStream) {
      enableStream();
    } else {
      return () => {
        mediaStream.getTracks().forEach((t) => {
          t.stop();
        });
      };
    }
  }, dependencies);

  return mediaStream;
};

export default useUserMedia;
