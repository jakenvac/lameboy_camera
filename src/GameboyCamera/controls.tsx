import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LameShutterButton } from "./components/button";

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
  flex-direction: row;
  margin-top: 1rem;
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
        {c.label}
      </option>
    ))}
  </StyledSelect>
);

const Controls = (props: ControlsProps) => {
  const [cameraList, setCameraList] = useState<CameraDescriptor[]>(
    props.cameras
  );

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

  const handleShutterButton = () => props.onShutterButton();

  return (
    <ControlsRoot>
      <ControlsContainer>
        <Scroller>
          {cameraList && cameraList.length > 1 && (
            <>
              <StyledLabel>Select Camera</StyledLabel>
              <CameraList
                cameraList={cameraList}
                onChange={handleCameraChange}
              />
            </>
          )}
          <StyledLabel>Contrast</StyledLabel>
          <input
            type="range"
            min={0}
            max={15}
            defaultValue={7}
            onChange={handleContrastChange}
          />
          <ControlRow>
            <LeftColumn>
              <StyledLabel>Brightness</StyledLabel>
              <input
                type="range"
                min={-100}
                max={100}
                defaultValue={50}
                step={200 / 16}
                onChange={handleBrightnessChange}
              />
            </LeftColumn>
            <RightColumn>
              <StyledLabel>Low Light</StyledLabel>
              <input type="checkbox" onChange={handleLowLightChanged} />
            </RightColumn>
          </ControlRow>
        </Scroller>
        <ShutterContainer>
          <LameShutterButton onClick={handleShutterButton} />
        </ShutterContainer>
      </ControlsContainer>
    </ControlsRoot>
  );
};

export default Controls;
