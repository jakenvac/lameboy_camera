type palette = {
  name: string;
  black: string;
  dark_gray: string;
  light_gray: string;
  white: string;
};

type bytePalette = {
  name: string;
  black: number[];
  dark_gray: number[];
  light_gray: number[];
  white: number[];
};

const defaultPalette = {
  name: "default",
  black: 0x00,
  dark_gray: 0x55,
  light_gray: 0xab,
  white: 0xff,
};

const colorStringToByteArray = (color: string) => {
  const r = parseInt(`0x${color.substring(1, 3)}`);
  const g = parseInt(`0x${color.substring(3, 5)}`);
  const b = parseInt(`0x${color.substring(5)}`);
  return [r, g, b];
};

const convertToBytes = (p: palette) => {
  return {
    name: p.name,
    black: colorStringToByteArray(p.black),
    dark_gray: colorStringToByteArray(p.dark_gray),
    light_gray: colorStringToByteArray(p.light_gray),
    white: colorStringToByteArray(p.white),
  };
};

const paletteMap = (imageData: ImageData, palette: palette) => {
  const bytePalette: bytePalette = convertToBytes(palette);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const color = d[i];
    let r = color,
      g = color,
      b = color;
    if (color === defaultPalette.black) {
      r = bytePalette.black[0];
      g = bytePalette.black[1];
      b = bytePalette.black[2];
    } else if (color === defaultPalette.dark_gray) {
      r = bytePalette.dark_gray[0];
      g = bytePalette.dark_gray[1];
      b = bytePalette.dark_gray[2];
    } else if (color === defaultPalette.light_gray) {
      r = bytePalette.light_gray[0];
      g = bytePalette.light_gray[1];
      b = bytePalette.light_gray[2];
    } else if (color === defaultPalette.white) {
      r = bytePalette.white[0];
      g = bytePalette.white[1];
      b = bytePalette.white[2];
    }
    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }
  return imageData;
};

export { paletteMap, palette };
