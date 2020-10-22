import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import Camera from "./camera";
import ImageCanvas from "./ImageCanvas";
import Controls from "./controls";
import { filterPipeline } from "./filterPipeline";

const StyledGameboyCamera = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
  max-height: 100%;
  margin: auto;

  max-width: 100%;
  @media (min-width: 500px) {
    max-width: 80vmin;
  }
  @media (min-width: 700px) {
    max-width: 50vmin;
  }

  border: 2px solid #ffcc00;
  border-radius: 1rem 1rem 4rem 1rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.3rem;
  font-family: "nunito", sans-serif;
  font-style: italic;
  font-weight: 900;
  margin: 0;
  align-text: left;
  width: 100%;
`;

const StyledViewfinder = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  padding: 1rem;
`;

const GameboyCamera = () => {
  const cameraRef = useRef<HTMLVideoElement>();

  const [frame, setFrame] = useState<ImageData>();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [activeDeviceId, setActiveDeviceId] = useState<string>(undefined);
  const contrast = useRef<number>(7);
  const brightness = useRef<number>(50);
  const lowLight = useRef<boolean>(false);

  const interval = 16;

  const updateDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter((d) => d.kind === "videoinput");
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
      <StyledViewfinder>
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
      </StyledViewfinder>
      <Controls
        onShutterButton={() => takePhoto()}
        onContrastChange={(c) => (contrast.current = c)}
        onBrightnessChange={(b) => (brightness.current = b)}
        onLowLightChange={(l) => (lowLight.current = l)}
        cameras={devices}
        onCameraChange={(c) => setActiveDeviceId(c)}
      />
    </StyledGameboyCamera>
  );
};

export default GameboyCamera;
