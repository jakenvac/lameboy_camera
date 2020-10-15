import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";

import Camera from "./camera";
import Filter from "./filter";

const StyledGameboyCamera = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 80vmin;
  padding: 20px;
`;

const StyledH2 = styled.h2`
  font-size: 30px;
  font-family: "Nunito Sans", sans-serif;
  margin: 0;
  align-text: left;
  width: 100%;
  span {
    color: #fff;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    -webkit-text-stroke: 1px black;
  }
`;

const StyledLabel = styled.label`
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
`;

const StyledButton = styled.button`
  border-radius: 30px;
  border: none;
  font-family: "Nunito Sans", sans-serif;
  color: #ffcc00;
  background: black;
  font-size: 25px;
  padding: 5px;
  border: 5px solid black;

  transition: background 300ms, color 300ms;

  &:hover {
    color: black;
    background: #ffcc00;
    cursor: pointer;
  }

  margin-bottom: 10px;
  margin-top: 10px;
`;

const GameboyCamera = () => {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const [frame, setFrame] = useState<ImageData>();
  const [contrast, setContrast] = useState<number>(95);
  const [frontCam, setFrontCam] = useState<boolean>(true);

  const interval = 16;

  const takePhoto = () => {
    const cnvs = canvasRef.current;
    const link = document.createElement("a");
    const today = new Date();
    link.download = `lbc_${today.getFullYear()}_${
      today.getMonth() + 1
    }_${today.getDate()}_${today.getMilliseconds()}.png`;
    link.href = cnvs.toDataURL();
    link.click();
  };

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
    <StyledGameboyCamera>
      <StyledH2>
        LAME BOY <span>camera</span>
      </StyledH2>
      <Camera
        hidden
        ref={videoRef}
        facing={frontCam ? "user" : "environment"}
      />
      <Filter frame={frame} contrast={contrast} ref={canvasRef} />
      <StyledLabel htmlFor="contrast">Contrast</StyledLabel>
      <input
        name="contrast"
        type="range"
        min="-100"
        max="100"
        value={contrast}
        onChange={(e) => setContrast((e.target.value as unknown) as number)}
      />
      <StyledButton onClick={() => takePhoto()}>Take Photo</StyledButton>
      <StyledButton onClick={() => setFrontCam(!frontCam)}>
        Swap Cam
      </StyledButton>
    </StyledGameboyCamera>
  );
};

export default GameboyCamera;
