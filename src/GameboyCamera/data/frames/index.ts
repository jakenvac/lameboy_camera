import simtendoPng from './simtendo.png';
import redditPng from './reddit.png';
import lameboyPng from './lameboy.png';

type frame = {
  name: string;
  resource: string;
};

const simtendo: frame = {
  name: 'Simtendo',
  resource: simtendoPng,
};

const reddit: frame = {
  name: 'Reddit',
  resource: redditPng,
};

const lameboy: frame = {
  name: 'Lameboy',
  resource: lameboyPng,
};

const frameDictionary: Record<string, frame> = {
  simtendo: simtendo,
  reddit: reddit,
  lameboy: lameboy,
};

export default frameDictionary;
