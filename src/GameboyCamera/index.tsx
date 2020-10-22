import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import Camera from "./camera";
import ImageCanvas from "./ImageCanvas";
import { filterPipeline } from "./filterPipeline";

const StyledGameboyCamera = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
  @media (min-width: 600px) {
    min-width: 80vmin;
  }
  @media (min-width: 800px) {
    min-width: 50vmin;
  }
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
  margin-left: 20px;
  margin-right: 20px;
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

const StyledControls = styled.div`
  padding: 20px;
  @media (min-width: 600px) {
    min-width: padding: none;
  }
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
`;

const GameboyCamera = () => {
  const cameraRef = useRef<HTMLVideoElement>();

  const [frame, setFrame] = useState<ImageData>();
  const contrast = useRef<number>(7);
  const brightness = useRef<number>(50);
  const lowLight = useRef<boolean>(false);
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
    const workingCanvas = document.createElement("canvas");
    workingCanvas.width = 128;
    workingCanvas.height = 112;
    const ctx = workingCanvas.getContext("2d");
    ctx.putImageData(frame, 0, 0);
    const link = document.createElement("a");
    const today = new Date();
    link.download = `lbc_${today.getFullYear()}_${
      today.getMonth() + 1
    }_${today.getDate()}_${today.getMilliseconds()}.png`;
    link.href = workingCanvas.toDataURL();
    link.click();
  };

  const updateFrame = () => {
    if (!cameraRef.current) return;
    const workingCanvas = document.createElement("canvas");
    const ctx = workingCanvas.getContext("2d");
    ctx.drawImage(cameraRef.current, 0, 0);
    const imageData = filterPipeline(ctx.getImageData(0, 0, 128, 112), {
      brightness: brightness.current,
      contrast: contrast.current,
      lowLight: lowLight.current,
    });

    setFrame(imageData);
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
      <ImageCanvas frame={frame} />
      <StyledControls>
        <StyledButton onClick={() => takePhoto()}>Take Photo</StyledButton>
        <StyledLabel>Select Camera</StyledLabel>
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
          min="0"
          max="15"
          value={contrast.current}
          onChange={(e) =>
            (contrast.current = (e.target.value as unknown) as number)
          }
        />
        <StyledLabel htmlFor="brightness">Brightness</StyledLabel>
        <input
          name="brightness"
          type="range"
          min="-100"
          max="100"
          step={200 / 16}
          value={brightness.current}
          onChange={(e) =>
            (brightness.current = (e.target.value as unknown) as number)
          }
        />
        <StyledLabel htmlFor="lowLight">Low Light</StyledLabel>
        <input
          type="checkbox"
          checked={lowLight.current}
          onChange={(e) => {
            console.log(e.target.value);
            lowLight.current = e.target.checked;
          }}
        />
      </StyledControls>
    </StyledGameboyCamera>
  );
};

export default GameboyCamera;
