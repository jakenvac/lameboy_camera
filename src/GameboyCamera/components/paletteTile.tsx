import React from "react";
import styled from "styled-components";
import { LameButtonInverted } from "./button";

const Palette = styled.div`
  background: black;

  display: flex;
  flex-direction: row;

  border: 1px solid white;
`;

const Color = styled.div<{ fill: string }>`
  width: 1rem;
  height: 1rem;
  background: ${(p) => p.fill};
`;

type PaletteTileProps = {
  black: string;
  dark_gray: string;
  light_gray: string;
  white: string;
};

const PaletteTile = ({
  black,
  dark_gray,
  light_gray,
  white,
}: PaletteTileProps) => {
  return (
    <Palette>
      <Color fill={black} />
      <Color fill={dark_gray} />
      <Color fill={light_gray} />
      <Color fill={white} />
    </Palette>
  );
};

type PaletteButtonProps = {
  text: string;
  colors: PaletteTileProps;
} & React.HTMLAttributes<HTMLButtonElement>;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Text = styled.div`
  align-text: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const PaletteButton = ({ text, colors, ...props }: PaletteButtonProps) => {
  return (
    <LameButtonInverted color="white" {...props}>
      <Row>
        <PaletteTile {...colors} />
        <Text>{text}</Text>
      </Row>
    </LameButtonInverted>
  );
};

export { PaletteTile, PaletteButton };
