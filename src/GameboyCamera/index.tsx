import React, { useRef, useEffect, useState } from "react";
import Camera from "./camera";
import Filter from "./filter";

const GameboyCamera = () => {
  const videoRef = useRef<HTMLVideoElement>();
  const [frame, setFrame] = useState<ImageData>();
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [frequency, setFrequency] = useState(128);

  const updateFrame = () => {
    if (!videoRef.current) return;

    const cnvs = document.createElement("canvas");
    const ctx = cnvs.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 128, 128);
    setFrame(ctx.getImageData(0, 0, 128, 128));
  };

  const frameTimer = () => {
    if (!liveUpdate) return;

    updateFrame();
    setTimeout(() => frameTimer(), frequency);
  };

  useEffect(() => {
    frameTimer();
  }, []);

  return (
    <>
      <Camera ref={videoRef} />
      <Filter frame={frame} />
    </>
  );
};

export default GameboyCamera;
