import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import addFrame from './addFrame';
import { paletteMap } from './paletteMap';

const StyledSquare = styled.div<{ ratio: number }>`
  width: 100%;
  padding-top: ${(p) => p.ratio * 100}%;
  position: relative;
`;

const StyledCanvas = styled.canvas`
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

type ImageCanvasProps = {
  scene: ImageData;
};

const ImageCanvas = ({ scene }: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const insertScene = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(scene, 0, 0);
  };

  useEffect(() => {
    if (!scene || !scene.data) return;
    insertScene();
  }, [scene]);

  return (
    <StyledSquare ratio={144 / 160}>
      <StyledCanvas ref={canvasRef} width={160} height={144} />
    </StyledSquare>
  );
};

export default ImageCanvas;
