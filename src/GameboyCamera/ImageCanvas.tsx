import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div`
  width: 100%;
  padding-top: 87.5%;
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
    <StyledSquare>
      <StyledCanvas
        ref={canvasRef}
        width={frame?.width}
        height={frame?.height}
      />
    </StyledSquare>
  );
};

export default ImageCanvas;
