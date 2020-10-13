import React, { useRef, useEffect, useState } from "react";
import Camera from "./camera";
import Filter from "./filter";

const GameboyCamera = () => {
  const videoRef = useRef<HTMLVideoElement>();
  const [frame, setFrame] = useState<ImageData>();

  const interval = 16;

  const updateFrame = () => {
    if (!videoRef.current) return;

    const cnvs = document.createElement("canvas");
    const ctx = cnvs.getContext("2d");
    ctx.translate(128, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, 128, 128);
    setFrame(ctx.getImageData(0, 0, 128, 128));
  };

  const frameTimer = () => {
    updateFrame();
    setTimeout(() => frameTimer(), interval);
  };

  useEffect(() => {
    frameTimer();
  }, []);

  return (
    <>
      <Camera hidden ref={videoRef} />
      <Filter frame={frame} />
    </>
  );
};

export default GameboyCamera;
