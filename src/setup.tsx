import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import Camera from './GameboyCamera';

const app = document.getElementById('app');

const Root = () => {
    return <Camera />;
};

render(<Root />, app);
