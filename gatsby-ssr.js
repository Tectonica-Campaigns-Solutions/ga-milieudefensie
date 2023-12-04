import * as React from 'react';

// Preload font example
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/inter--black.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interBlack"
    />,
    <link
      rel="preload"
      href="/fonts/inter--bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interBold"
    />,
    <link
      rel="preload"
      href="/fonts/inter--extrabold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interExtraBold"
    />,
    <link
      rel="preload"
      href="/fonts/inter--extralight.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interExtraLight"
    />,
    <link
      rel="preload"
      href="/fonts/inter--light.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interLight"
    />,
    <link
      rel="preload"
      href="/fonts/inter--medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interMedium"
    />,
    <link
      rel="preload"
      href="/fonts/inter--regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interRegular"
    />,
    <link
      rel="preload"
      href="/fonts/inter--semibold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interSemiBold"
    />,
    <link
      rel="preload"
      href="/fonts/inter--thin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interThin"
    />,
  ]);
};
