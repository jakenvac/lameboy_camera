// import Dither from "ditherjs";

import { ditherFilter } from "./dither";
import { paletteMap, peaGreenPalette } from "./paletteMap";

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

    const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;

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

    const luma = (r + g + b) / 3;

    d[i] = d[i + 1] = d[i + 2] = luma;
  }
  return imageData;
};

const filterPipeline = (
  imageData: ImageData,
  { brightness, contrast }: filterOptions
) => {
  //imageData = greyscaleFilter(imageData);
  imageData = brightnessFilter(imageData, brightness);
  imageData = lumaFilter(imageData);
  imageData = ditherFilter(imageData, contrast);
  //imageData = paletteMap(imageData, peaGreenPalette);
  return imageData;
};

export { filterPipeline, filterOptions };
