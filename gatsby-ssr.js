import * as React from 'react';

// Preload font example
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/lato/Lato-Black.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="latoBlack"
    />,
    <link
      rel="preload"
      href="/fonts/lato/Lato-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="latoBold"
    />,
    <link
      rel="preload"
      href="/fonts/lato/Lato-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="latoRegular"
    />,
    <link
      rel="preload"
      href="/fonts/lato/Lato-Light.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="latoLight"
    />,
    <link
      rel="preload"
      href="/fonts/lato/Lato-Thin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="latoThin"
    />,
  ]);
};
