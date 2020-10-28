import React from 'react';
import { Helmet } from 'react-helmet';

import preview from './metadata/preview.png';
import ReactGA from 'react-ga';

const SiteMetadata = () => {
  ReactGA.initialize('G-L6QR4BZJ4M');
  ReactGA.pageview('Lameboy Camera');

  return (
    <Helmet>
      <meta name="og:title" content="Lameboy Camera" />
      <meta
        name="og:description"
        content="Take gameboy camera photos in your web browser"
      />
      <meta name="og:image" content={preview} />
      <meta name="og:url" content=" https://lbcam.xyz" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SiteMetadata;
