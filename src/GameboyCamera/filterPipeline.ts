// import Dither from "ditherjs";

import { ditherFilter } from "./dither";

type filterOptions = {
  brightness: number;
  contrast: number;
};

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

const minMax = (value: number, min: number, max: number) => {
  value = value > max ? max : value;
  value = value < min ? min : value;
  return value;
};

// const ditherFilter = (imageData: ImageData) => {
//   const dither = new Dither(ditherOptions);
//   dither.ditherImageData(imageData);
//   return imageData;
// };

const brightnessFilter = (imageData: ImageData, value: number) => {
  value = minMax(value, -100, 100);

  const d = imageData.data;
  for (var i = 0; i < d.length; i += 4) {
    d[i] += 255 * (value / 100);
    d[i + 1] += 255 * (value / 100);
    d[i + 2] += 255 * (value / 100);
  }
  return imageData;
};

const contrastFilter = (imageData: ImageData, value: number) => {
  value = minMax(value, -100, 300);
  const d = imageData.data;

  value = value / 100 + 1;
  var intercept = 128 * (1 - value);
  for (var i = 0; i < d.length; i += 4) {
    d[i] = d[i] * value + intercept;
    d[i + 1] = d[i + 1] * value + intercept;
    d[i + 2] = d[i + 2] * value + intercept;
  }
  return imageData;
};

const lumaFilter = (imageData: ImageData) => {
  const d = imageData.data;
  for (var i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const luma = r * 0.299 + g * 0.587 + b * 0.114;

    d[i] = d[i + 1] = d[i + 2] = luma;
  }
  return imageData;
};

const greyscaleFilter = (imageData: ImageData) => {
  const d = imageData.data;
  for (var i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const luma = (r + g + b) / 2;

    d[i] = d[i + 1] = d[i + 2] = luma;
  }
  return imageData;
};

const gbMapFilter = (imageData: ImageData) => {
  const d = imageData.data;
  for (var i = 0; i < d.length; i += 4) {
    let r = d[i];
    if (r < 64) r = 0;
    else if (r < 128) r = 85;
    else if (r < 191) r = 171;
    else r = 255;
    d[i] = d[i + 1] = d[i + 2] = r;
  }
  return imageData;
};

const filterPipeline = (
  imageData: ImageData,
  { brightness, contrast }: filterOptions
) => {
  imageData = greyscaleFilter(imageData);
  imageData = brightnessFilter(imageData, brightness);
  imageData = ditherFilter(imageData, contrast);
  return imageData;
};

export { filterPipeline, filterOptions };
