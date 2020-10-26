import React from 'react';
import styled from 'styled-components';
import { LameButtonInverted } from './button';

type FrameButtonProps = {
  text: string;
  imageSrc: string;
  size: 'lg' | 'sm';
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

const Image = styled.img<{ preview: 'lg' | 'sm' }>`
  width: ${(p) => (p.preview === 'lg' ? '50%' : '4rem')};
`;

const FrameButton = ({ text, imageSrc, size, ...props }: FrameButtonProps) => {
  return (
    <LameButtonInverted color="white" {...props}>
      <Row>
        <Image preview={size} src={imageSrc} />
        <Text>{text}</Text>
      </Row>
    </LameButtonInverted>
  );
};

export { FrameButton };
