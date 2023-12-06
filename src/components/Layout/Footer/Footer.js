import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
import wpIcon from '../../Icons/wp-icon.svg';
import Cta from '../../Global/Cta/Cta';

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
        columns {
          ... on DatoCmsMenuColumn {
            id
            label
            content
          }
        }
        bottomLinks {
          ... on DatoCmsGlobalLink {
            id
            label
            externalUrl
            content {
              ... on DatoCmsBasicPage {
                id
                slug
              }
            }
          }
        }
      }
    }
  `);

  const { logo = null, columns = [], bottomLinks = [], socialLinks = [], cta } = data.datoCmsFooter;
  const hasColumnsLinks = columns && columns.length > 0;

  return (
    <div className={`footer-container ${isLanding ? 'landing' : ''}`}>
      <div className="container">
        {/* First row */}
        <div className="first-row">
          <div>
            <Link to={'/'}>
              <img src={isLanding ? customLogo?.url : logo?.url} alt={logo.alt} />
            </Link>
          </div>

          <div className="wp-btn">
            <span>Join Us to Our WhatsApp Community</span>
            <ReactSVG src={wpIcon} />
          </div>
        </div>

        {/* Second row */}
        <div className="row">
          {/* Columns links items */}
          {hasColumnsLinks &&
            columns.map((column) => (
              <div key={column.id} className="col-lg-3 col-6 columns-links">
                <h2>{column.label}</h2>
                <div className="content" dangerouslySetInnerHTML={{ __html: column.content }} />
              </div>
            ))}

          <div className="col extra-data">
            <Cta url="https://milieudefensie.nl/" externalTitle="milieudefensie.nl" customVariant="green" />

            {/* Extra links */}
            <div className="extra-links">
              {bottomLinks.map((link) => (
                <div key={link.id}>
                  <Link to={link}>{link.label}</Link>
                </div>
              ))}
            </div>

            <div className="extra-text">
              <span>Milieudefensie is onderdeel van Friends of the Earth International</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
