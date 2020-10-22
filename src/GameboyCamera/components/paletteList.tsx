import React from "react";
import styled from "styled-components";
import { PaletteButton } from "./paletteTile";

import palettes from "../data/palettes.json";

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.8);
`;

const List = styled.div`
  margin: auto;
  max-width: 100%;
  @media (min-width: 500px) {
    max-width: 80vmin;
  }
  @media (min-width: 700px) {
    max-width: 50vmin;
  }
  overflow-y: auto;
  max-height: 100%;

  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

type PaletteListProps = {
  onPaletteSelect: (name: string) => void;
};

const PaletteList = (props: PaletteListProps) => (
  <FullScreen onClick={() => {}}>
    <List>
      {palettes.map(({ name, black, dark_gray, light_gray, white }) => (
        <ListItem key={name}>
          <PaletteButton
            onClick={() => props.onPaletteSelect(name)}
            text={name}
            colors={{
              black,
              dark_gray,
              light_gray,
              white,
            }}
          />
        </ListItem>
      ))}
    </List>
  </FullScreen>
);

export { PaletteList };
