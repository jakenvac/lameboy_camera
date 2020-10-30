import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LameShutterButton } from './components/button';
import { PaletteButton, PaletteTile } from './components/paletteTile';
import { PaletteList } from './components/paletteList';
import frames from './data/frames';
import palettes from './data/palettes.json';
import { FrameButton } from './components/frameButton';
import { FrameList } from './components/frameList';

const ControlsRoot = styled.div`
  flex: 1;
  position: relative;
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const Scroller = styled.div`
  padding: 1rem;
  padding-top: 0;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: red;
  }

  background: linear-gradient(0deg, rgba(50, 50, 50, 0.5) 0%, rgba(0, 0, 0, 1));
`;

const ControlRow = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  margin-top: 1rem;
`;

const ControlRowSingle = styled.div`
  flex-shrink: 0;
  margin-top: 1rem;
  * {
    width: 100%;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ShutterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledSelect = styled.select`
  color: black;
  option {
    color: black;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-top: 1rem;
  &:first-of-type {
    margin-top: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
`;

type CameraDescriptor = {
  label: string;
  deviceId: string;
};

type ControlsProps = {
  cameras: CameraDescriptor[];
  onContrastChange: (value: number) => void;
  onBrightnessChange: (value: number) => void;
  onLowLightChange: (value: boolean) => void;
  onCameraChange: (value: string) => void;
  onPaletteChange: (value: string) => void;
  onFrameChange: (value: string) => void;
  onShutterButton: () => void;
};

const CameraList = ({
  onChange,
  cameraList,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cameraList: CameraDescriptor[];
}) => (
  <StyledSelect onChange={onChange}>
    {cameraList.map((c) => (
      <option key={c.deviceId} value={c.deviceId}>
        {c.label || c.deviceId}
      </option>
    ))}
  </StyledSelect>
);

const Controls = (props: ControlsProps) => {
  const [showPalettes, setShowPalettes] = useState<boolean>(false);
  const [showFrames, setShowFrames] = useState<boolean>(false);
  const [cameraList, setCameraList] = useState<CameraDescriptor[]>(
    props.cameras,
  );

  const [paletteName, setPaletteName] = useState<string>('default');
  const palette = palettes.find((p) => p.name === paletteName);

  const [frameName, setFrameName] = useState<string>('lameboy');

  useEffect(() => {
    setCameraList(props.cameras);
  }, [props.cameras]);

  const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onContrastChange((e.target.value as unknown) as number);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onBrightnessChange((e.target.value as unknown) as number);

  const handleLowLightChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onLowLightChange(e.target.checked);

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    props.onCameraChange(e.target.value);

  const handlePaletteButton = () => {
    setShowPalettes(true);
  };

  const handleFrameButton = () => {
    setShowFrames(true);
  };

  const handleShutterButton = () => props.onShutterButton();

  return (
    <ControlsRoot>
      {showPalettes && (
        <PaletteList
          onPaletteSelect={(p) => {
            setShowPalettes(false);
            setPaletteName(p);
            props.onPaletteChange(p);
          }}
        />
      )}
      {showFrames && (
        <FrameList
          onFrameSelect={(f) => {
            setShowFrames(false);
            setFrameName(f);
            props.onFrameChange(f);
          }}
        />
      )}
      <ControlsContainer>
        <Scroller>
          {cameraList && cameraList.length > 0 && (
            <ControlRowSingle>
              <StyledLabel>Select Camera</StyledLabel>
              <CameraList
                cameraList={cameraList}
                onChange={handleCameraChange}
              />
            </ControlRowSingle>
          )}
          <ControlRowSingle>
            <StyledLabel>Contrast</StyledLabel>
            <input
              type="range"
              min={0}
              max={15}
              defaultValue={7}
              onChange={handleContrastChange}
            />
          </ControlRowSingle>
          <ControlRow>
            <LeftColumn>
              <StyledLabel>Brightness</StyledLabel>
              <input
                type="range"
                min={-100}
                max={100}
                defaultValue={0}
                onChange={handleBrightnessChange}
              />
            </LeftColumn>
            <RightColumn>
              <StyledLabel>Low Light</StyledLabel>
              <input type="checkbox" onChange={handleLowLightChanged} />
            </RightColumn>
          </ControlRow>
          <ButtonContainer>
            <PaletteButton
              onClick={handlePaletteButton}
              text={'Select Palette'}
              colors={palette}
            />
          </ButtonContainer>
          <ButtonContainer>
            <FrameButton
              onClick={handleFrameButton}
              text={'Select Frame'}
              imageSrc={frames[frameName].resource}
              size={'sm'}
            />
          </ButtonContainer>
        </Scroller>
        <ShutterContainer>
          <LameShutterButton onClick={handleShutterButton} />
        </ShutterContainer>
      </ControlsContainer>
    </ControlsRoot>
  );
};

export default Controls;
