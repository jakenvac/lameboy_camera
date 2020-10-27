import React from 'react';
import { Helmet } from 'react-helmet';

import preview from './metadata/preview.png';

const SiteMetadata = () => {
  return (
    <Helmet>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L6QR4BZJ4M"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-L6QR4BZJ4M');
        `,
        }}
      />
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
