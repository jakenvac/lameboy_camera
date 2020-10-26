import frames from './data/frames';

const addFrame = (imageData: ImageData, frameName: string) => {
  const frame = frames[frameName.toLowerCase()];

  if (!frame || !frame.resource) return imageData;

  const frameImage = document.createElement('img');
  frameImage.src = frame.resource;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(frameImage, 0, 0, 160, 144);
  ctx.putImageData(imageData, 16, 16);

  return ctx.getImageData(0, 0, 160, 144);
};

export default addFrame;
