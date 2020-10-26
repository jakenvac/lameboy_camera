import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div<{ ratio: number }>`
  width: 100%;
  padding-top: ${(p) => p.ratio * 100}%;
  position: relative;
`;

const StyledCanvas = styled.canvas`
  image-rendering: pixelated;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  background: black;
`;

type ImageCanvasProps = {
  frame?: ImageData;
};

const ImageCanvas = ({ frame }: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (!frame || !frame.data) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(frame, 0, 0);
  }, [frame]);

  return (
    <StyledSquare ratio={frame && frame?.height / frame?.width}>
      <StyledCanvas
        ref={canvasRef}
        width={frame?.width}
        height={frame?.height}
      />
    </StyledSquare>
  );
};

export default ImageCanvas;
