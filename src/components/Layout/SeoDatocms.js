import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SeoDatoCMS = ({ seo, favicon = null, homepage = false }) => {
  if (homepage) {
    seo.tags[0].content = seo.tags[0].content.replace('- Milieudefensie', '');
  }

  return <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags} />;
};

export default SeoDatoCMS;
