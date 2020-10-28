import React from 'react';
import { Helmet } from 'react-helmet';

import preview from './metadata/preview.png';
import ReactGA from 'react-ga';

const SiteMetadata = () => {
  ReactGA.initialize('G-L6QR4BZJ4M');
  ReactGA.pageview('Lameboy Camera');

  return (
    <Helmet>
      <meta name="title" content="Lameboy Camera"></meta>
      <meta
        name="description"
        content="Take game boy camera selfies in your web browser"
      ></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://lbcam.xyz/"></meta>
      <meta property="og:title" content="Lameboy Camera"></meta>
      <meta
        property="og:description"
        content="Take game boy camera photos in your web browser"
      />
      <meta property="og:image" content={preview} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SiteMetadata;
