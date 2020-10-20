type palette = {
  black: number[];
  dark_gray: number[];
  light_gray: number[];
  white: number[];
};

const defaultPalette = {
  black: 0x00,
  dark_gray: 0x55,
  light_gray: 0xab,
  white: 0xff,
};

const peaGreenPalette: palette = {
  black: [0x2d, 0x1b, 0x00],
  dark_gray: [0x1e, 0x60, 0x6e],
  light_gray: [0x5a, 0xb9, 0xa8],
  white: [0xc4, 0xf0, 0xc2],
};

const paletteMap = (imageData: ImageData, palette: palette) => {
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const color = d[i];
    let r = color,
      g = color,
      b = color;
    if (color === defaultPalette.black) {
      r = palette.black[0];
      g = palette.black[1];
      b = palette.black[2];
    } else if (color === defaultPalette.dark_gray) {
      r = palette.dark_gray[0];
      g = palette.dark_gray[1];
      b = palette.dark_gray[2];
    } else if (color === defaultPalette.light_gray) {
      r = palette.light_gray[0];
      g = palette.light_gray[1];
      b = palette.light_gray[2];
    } else if (color === defaultPalette.white) {
      r = palette.white[0];
      g = palette.white[1];
      b = palette.white[2];
    }
    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }
  return imageData;
};

export { paletteMap, palette, peaGreenPalette };
