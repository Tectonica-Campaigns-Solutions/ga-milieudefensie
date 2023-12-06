import React from 'react';
import Link from '../Link/Link';

import './index.scss';

export default function Cta({ cta = null, url = '', externalTitle = '', isButton = false, customVariant = null }) {
  const isCtaPrimaryButton = cta?.isButton || isButton;

  return (
    <Link
      className={`custom-btn ${isCtaPrimaryButton ? 'custom-btn-primary' : ''} ${cta?.buttonStyle} ${
        customVariant ? customVariant : ''
      }`}
      to={cta || url}
      target={url ? '_blank' : ''}
    >
      {externalTitle || cta?.title}
    </Link>
  );
}
