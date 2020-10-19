import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";

import Camera from "./camera";
import Filter from "./filter";

const StyledGameboyCamera = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 80vmin;
  @media (min-width: 800px) {
    min-width: 50vmin;
  }
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
  const cameraRef = useRef<HTMLCanvasElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const [frame, setFrame] = useState<ImageData>();
  const [contrast, setContrast] = useState<number>(95);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [activeDeviceId, setActiveDeviceId] = useState<string>(undefined);

  const interval = 16;

  const updateDevices = async () => {
    const devices = navigator.mediaDevices.enumerateDevices();
    const inputs = (await devices).filter((d) => d.kind === "videoinput");
    if (inputs.length > 0) {
      setActiveDeviceId(inputs[0].deviceId);
      setDevices(inputs);
    }
  };

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
    if (!cameraRef.current) return;
    const ctx = cameraRef.current.getContext("2d");
    setFrame(ctx.getImageData(0, 0, 128, 128));
  };

  const frameTimer = () => {
    updateFrame();
    setTimeout(() => frameTimer(), interval);
  };

  useEffect(() => {
    updateDevices();
    frameTimer();
  }, []);

  return (
    <StyledGameboyCamera>
      <StyledH2>
        LAME BOY <span>camera</span>
      </StyledH2>
      <Camera
        ref={cameraRef}
        deviceId={activeDeviceId}
        frameInterval={interval}
        hidden
      />
      <Filter frame={frame} contrast={contrast} ref={canvasRef} />
      <select
        value={activeDeviceId}
        onChange={(e) => {
          setActiveDeviceId(e.target.value);
          console.log(e.target.value);
        }}
      >
        {devices &&
          devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))}
      </select>
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
    </StyledGameboyCamera>
  );
};

export default GameboyCamera;
