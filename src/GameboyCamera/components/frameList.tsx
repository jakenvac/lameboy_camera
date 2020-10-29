import React from 'react';
import styled from 'styled-components';

import frames from '../data/frames';
import { FrameButton } from './frameButton';

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
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

type FrameListProps = {
  onFrameSelect: (name: string) => void;
};

const FrameList = (props: FrameListProps) => {
  const f = Object.keys(frames);
  return (
    <FullScreen onClick={() => {}}>
      <List>
        {f.map((f) => (
          <ListItem key={f}>
            <FrameButton
              onClick={() => props.onFrameSelect(f)}
              text={f}
              imageSrc={frames[f].resource}
              size={'lg'}
            />
          </ListItem>
        ))}
      </List>
    </FullScreen>
  );
};

export { FrameList };
