import React from 'react';
import Link from '../Link/Link';
import { ReactSVG } from 'react-svg';

import facebookIcon from '../../Icons/job-facebook.svg';
import twitterIcon from '../../Icons/job-x.svg';
import linkedinIcon from '../../Icons/job-linkedin.svg';
import instagramIcon from '../../Icons/instagram.svg';

import facebookWhiteIcon from '../../Icons/facebook-white.svg';
import twitterWhiteIcon from '../../Icons/twitter-white.svg';
import instagramWhiteIcon from '../../Icons/instagram-white.svg';

import facebookLandingIcon from '../../Icons/landing_facebook.svg';
import twitterLandingIcon from '../../Icons/landing_twitter.svg';
import instagramLandingIcon from '../../Icons/landing_instagram.svg';

const SocialMap = {
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
};

const SocialWhiteVariantMap = {
  twitter: twitterWhiteIcon,
  facebook: facebookWhiteIcon,
  instagram: instagramWhiteIcon,
};

const SocialLandingVariantMap = {
  twitter: twitterLandingIcon,
  facebook: facebookLandingIcon,
  instagram: instagramLandingIcon,
};

const SocialLink = ({ name, url, whiteIcons = false, smallIcons = false, isLanding = false }) => {
  const socialImg = isLanding
    ? SocialLandingVariantMap[name]
    : whiteIcons
      ? SocialWhiteVariantMap[name]
      : SocialMap[name];

  return (
    <Link to={url} target="_blank" className={whiteIcons ? 'white-icons' : ''}>
      <ReactSVG height={smallIcons ? 25 : 40} src={socialImg} alt={name} />
    </Link>
  );
};

export default SocialLink;
