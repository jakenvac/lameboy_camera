import React, { useEffect, useRef, useState } from "react";
import Dither from "ditherjs";
import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  canvas {
    image-rendering: pixelated;
    min-width: 80vmin;
    min-height: 80vmin;
  }
`;

const Filter = React.forwardRef(
  (
    { frame }: { frame?: ImageData },
    ref: React.MutableRefObject<HTMLCanvasElement>
  ) => {
    const canvasRef = ref ?? useRef<HTMLCanvasElement>();

    const [contrast, setContrast] = useState<number>(95);

    const ditherOptions = {
      step: 1,
      algorithm: "ordered",
      palette: [
        [0, 0, 0, 255],
        [85, 85, 85, 255],
        [171, 171, 171, 255],
        [255, 255, 255, 255],
      ],
    };

    // Hack to make dithering seem more functional
    const fDither = (image: ImageData) => {
      const dither = new Dither(ditherOptions);
      dither.ditherImageData(image);
      return image;
    };

    useEffect(() => {
      if (!frame || !frame.data) return;

      const ctx = canvasRef.current.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      const d = frame.data;

      for (var i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        const luma = r * 0.299 + g * 0.587 + b * 0.114;
        // const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;

        d[i] = luma;
        d[i + 1] = luma;
        d[i + 2] = luma;
      }

      let imgContrast = contrast / 100 + 1;
      const intercept = 128 * (1 - imgContrast);
      for (var i = 0; i < d.length; i += 4) {
        d[i] = d[i] * imgContrast + intercept;
        d[i + 1] = d[i + 1] * imgContrast + intercept;
        d[i + 2] = d[i + 2] * imgContrast + intercept;
      }

      const ditheredFrame = fDither(frame);
      ctx.putImageData(ditheredFrame, 0, 0);
    }, [contrast, frame]);

    return (
      <StyledFilter>
        <canvas ref={canvasRef} width={128} height={128} />
        <input
          type="range"
          min="-100"
          max="100"
          value={contrast}
          onChange={(e) => setContrast((e.target.value as unknown) as number)}
        />
      </StyledFilter>
    );
  }
);

export default Filter;
