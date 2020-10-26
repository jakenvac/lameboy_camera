import lameboyPng from './lameboy.png';
import simtendoPng from './simtendo.png';
import nonePng from './black.png';
import filmPng from './film.png';
import redditPng from './reddit.png';

type frame = {
  name: string;
  resource: string;
};

const lameboy: frame = {
  name: 'Lameboy',
  resource: lameboyPng,
};

const film: frame = {
  name: 'Film',
  resource: filmPng,
};

const simtendo: frame = {
  name: 'Simtendo',
  resource: simtendoPng,
};

const none: frame = {
  name: 'None',
  resource: nonePng,
};

const reddit: frame = {
  name: 'Reddit',
  resource: redditPng,
};

const frameDictionary: Record<string, frame> = {
  lameboy,
  film,
  simtendo,
  none,
  reddit,
};

export default frameDictionary;
