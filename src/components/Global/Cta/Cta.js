import React from 'react';
import Link from '../Link/Link';
import { ReactSVG } from 'react-svg';

import './index.scss';

export default function Cta({
  cta = null,
  url = '',
  externalTitle = '',
  isButton = false,
  textStyle = false,
  customVariant = null,
}) {
  const isCtaPrimaryButton = cta?.isButton || isButton;

  return (
    <Link
      className={`btn ${isCtaPrimaryButton ? 'btn-primary' : ''} ${textStyle ? 'text-style' : ''} ${cta?.buttonStyle} ${
        customVariant ? customVariant : ''
      }`}
      to={cta || url}
      target={url ? '_blank' : ''}
    >
      <span>{externalTitle || cta?.title}</span>

      {textStyle && <ReactSVG src="/assets/cta-arrow.svg" />}
    </Link>
  );
}
