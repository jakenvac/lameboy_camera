import React, { useEffect, useRef, useState } from "react";
import Dither from "ditherjs";

import useUserMedia from "./useUserMedia";

const options = {
  step: 3, // The step for the pixel quantization n = 1,2,3...
  algorithm: "ordered", // one of ["ordered", "diffusion", "atkinson"]
};

const Camera = () => {
  const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const [contrast, setContrast] = useState<number>(95);

  const mediaStream = useUserMedia(
    {
      audio: false,
      video: { width: { exact: 128 }, height: { exact: 128 } },
    },
    [contrast]
  );

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

  const computeFrame = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(videoRef.current, 0, 0, 128, 128);
    let imageData = ctx.getImageData(0, 0, 128, 128);

    const d = imageData.data;
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

    const dither = new Dither(ditherOptions);
    dither.ditherImageData(imageData);
    ctx.putImageData(imageData, 0, 0);
  };

  const timerCallBack = () => {
    // if (videoRef.current.paused) return;

    computeFrame();
    setTimeout(() => timerCallBack(), 128);
  };

  if (mediaStream && videoRef.current && !videoRef.current.srcObject)
    videoRef.current.srcObject = mediaStream;

  useEffect(() => {
    timerCallBack();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        onCanPlay={() => videoRef.current?.play()}
        autoPlay
        playsInline
        muted
      />
      <canvas ref={canvasRef} width={128} height={128} />
      <input
        type="range"
        min="-100"
        max="100"
        value={contrast}
        onChange={(e) => setContrast((e.target.value as unknown) as number)}
      />
    </div>
  );
};

export default Camera;
