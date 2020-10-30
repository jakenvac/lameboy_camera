import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Camera from './camera';
import ImageCanvas from './ImageCanvas';
import Controls from './controls';
import { filterPipeline } from './filterPipeline';
import frames from './data/frames';
import { paletteMap } from './paletteMap';

const StyledGameboyCamera = styled.div`
  color: white;

  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100%;
  margin: auto;

  min-width: 100%;
  @media (min-width: 500px) {
    min-width: 80vmin;
  }
  @media (min-width: 700px) {
    min-width: 50vmin;
  }

  border: 2px solid #ffcc00;
  border-radius: 1rem 1rem 4rem 1rem;
`;

const Title = styled.h1`
  position: absolute;
  bottom: 0.2rem;
  left: 0.5rem;
  font-size: 1rem;
  font-family: 'nunito', sans-serif;
  font-style: italic;
  font-weight: 900;
  margin: 0;
  align-text: left;
  width: 100%;
`;

const StyledViewfinder = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #ffcc00;
  padding: 2rem;
  padding-top: 1.5rem;
  margin: 1rem;
  border-radius: 0.5rem 0.5rem 3rem 0.5rem;
  background: #222;
`;

const GameboyCamera = () => {
  const cameraRef = useRef<HTMLVideoElement>();

  const [composite, setComposite] = useState<ImageData>();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [activeDeviceId, setActiveDeviceId] = useState<string>(undefined);
  const capture = useRef<ImageData>();
  const frameData = useRef<ImageData>();
  const contrast = useRef<number>(7);
  const brightness = useRef<number>(50);
  const lowLight = useRef<boolean>(false);
  const paletteName = useRef<string>('default');
  const facing = useRef<string>('front');

  const interval = 64;

  const updateDevices = async () => {
    if (devices && devices.length > 0 && devices[0].label) return;
    const d = await navigator.mediaDevices.enumerateDevices();
    const inputs = d.filter((d) => d.kind === 'videoinput');
    console.table(d, inputs);
    if (inputs.length > 0) {
      setDevices(inputs);
    }
  };

  const takePhoto = () => {
    const workingCanvas = document.createElement('canvas');
    workingCanvas.width = 160;
    workingCanvas.height = 144;
    const ctx = workingCanvas.getContext('2d');
    ctx.putImageData(composite, 0, 0);
    const link = document.createElement('a');
    const today = new Date();
    link.download = `lbc_${today.getFullYear()}_${
      today.getMonth() + 1
    }_${today.getDate()}_${today.getMilliseconds()}.png`;
    link.href = workingCanvas.toDataURL();
    link.click();
  };

  const updateFrame = (frameName: string) => {
    const frameUrl = frames[frameName]?.resource;
    if (!frameUrl) return;
    const image = new Image();
    image.onload = () => {
      const workingCanvas = document.createElement('canvas');
      workingCanvas.width = 160;
      workingCanvas.height = 144;
      const ctx = workingCanvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      frameData.current = ctx.getImageData(0, 0, 160, 144);
    };
    image.src = frameUrl;
  };

  const updateCapture = () => {
    if (!cameraRef.current) return;
    const workingCanvas = document.createElement('canvas');
    const ctx = workingCanvas.getContext('2d');

    const videoWidth = cameraRef.current.videoWidth;
    const videoHeight = cameraRef.current.videoHeight;
    const smallest = videoWidth > videoHeight ? videoHeight : videoWidth;
    const left = (videoWidth - smallest) / 2;
    const top = (videoHeight - smallest) / 2;

    if (facing.current == 'front') {
      ctx.translate(128, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      cameraRef.current,
      left,
      top,
      smallest,
      smallest,
      0,
      0,
      128,
      128,
    );

    const imageData = filterPipeline(ctx.getImageData(0, 0, 128, 112), {
      brightness: brightness.current,
      contrast: contrast.current,
      lowLight: lowLight.current,
    });

    capture.current = imageData;
  };

  const composeImage = () => {
    const workingCanvas = document.createElement('canvas');
    workingCanvas.width = 160;
    workingCanvas.height = 144;
    const ctx = workingCanvas.getContext('2d');
    if (frameData.current) ctx.putImageData(frameData.current, 0, 0);
    if (capture.current) ctx.putImageData(capture.current, 16, 16);
    const palettedImage = paletteMap(
      ctx.getImageData(0, 0, 160, 144),
      paletteName.current,
    );
    setComposite(palettedImage);
  };

  const frameTimer = () => {
    updateCapture();
    composeImage();
    setTimeout(() => frameTimer(), interval);
  };

  useEffect(() => {
    updateFrame('lameboy');
    frameTimer();
  }, []);

  return (
    <StyledGameboyCamera>
      <StyledViewfinder>
        <Camera
          ref={cameraRef}
          deviceId={activeDeviceId}
          frameInterval={interval}
          onSetFacing={(f) => (facing.current = f)}
          onCameraStarted={updateDevices}
          hidden
        />
        <ImageCanvas scene={composite} />
        <Title>LAME BOY camera</Title>
      </StyledViewfinder>
      <Controls
        onShutterButton={() => takePhoto()}
        onContrastChange={(c) => (contrast.current = c)}
        onBrightnessChange={(b) => (brightness.current = b)}
        onLowLightChange={(l) => (lowLight.current = l)}
        cameras={devices}
        onCameraChange={(c) => setActiveDeviceId(c)}
        onPaletteChange={(p) => (paletteName.current = p)}
        onFrameChange={(f) => updateFrame(f)}
      />
    </StyledGameboyCamera>
  );
};

export default GameboyCamera;
