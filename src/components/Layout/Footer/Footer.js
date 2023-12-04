import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CtaList from '../../Global/Cta/CtaList';
import SocialLinkList from '../../Global/SocialLink/SocialLinkList';
import Link from '../../Global/Link/Link';

import './index.scss';

function Footer({ isLanding = false, customLogo = null }) {
  const data = useStaticQuery(graphql`
    query FooterData {
      datoCmsFooter {
        id
        logo {
          url
          width
          height
          alt
        }
        socialLinks {
          ... on DatoCmsSocialLink {
            id
            url
            socialNetwork
          }
        }
      }
    }
  `);
  if (!data?.datoCmsFooter) return null;

  const { logo = null, columns = [], bottomLinks = [], socialLinks = [], cta } = data.datoCmsFooter;

  const hasColumnsLinks = columns && columns.length > 0;
  const hasExtraLinks = bottomLinks && bottomLinks.length > 0;

  return (
    <div className={`footer-container ${isLanding ? 'landing' : ''}`}>
      <div className="container">
        <div className="row gy-5">
          {/* Logo item */}
          <div className="col-lg-3 col-12">
            <img src={isLanding ? customLogo?.url : logo?.url} alt={logo.alt} />
          </div>

          {/* Columns links items */}
          {hasColumnsLinks &&
            columns.map((column) => (
              <div key={column.id} className="col-lg-2 col-6 columns-links">
                <h2>{column.label}</h2>

                {column.items && column.items.length > 0 && (
                  <div className="general-links">
                    {column.items.map((i) => (
                      <Link key={i.id} to={i}>
                        {i.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Ctas */}
          {cta && (
            <div className="col-lg-3 extra-ctas">
              {!isLanding && <CtaList ctas={cta} customVariant="btn-white" />}

              {socialLinks && <SocialLinkList socialLinks={socialLinks} smallIcons whiteIcons isLanding={isLanding} />}
            </div>
          )}
        </div>

        {/* Extra links */}
        {!isLanding && (
          <div className="row">
            <div className="col-lg-12">
              {hasExtraLinks && (
                <div className="extra-links">
                  {bottomLinks.map((link) => (
                    <div key={link.id}>
                      <Link to={link}>{link.label}</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
