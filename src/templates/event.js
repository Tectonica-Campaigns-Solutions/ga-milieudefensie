import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import FloatLayout from '../components/Global/FloatLayout/FloatLayout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import dateIcon from '../components/Icons/calendar-date.svg';
import hourIcon from '../components/Icons/calendar-hour.svg';
import locationIcon from '../components/Icons/calendar-location.svg';
import wpIcon from '../components/Icons/wp-icon.svg';
import { ReactSVG } from 'react-svg';
import Link from '../components/Global/Link/Link';
import backBtnIcon from '../components/Icons/back-btn.svg';
import HubspotForm from '../components/Blocks/HubspotForm/HubspotForm';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';
import TagList from '../components/Global/Tag/TagList';

import './event.styles.scss';
import { formatDate } from '../utils';

const Event = ({ pageContext, data: { page, listEvent, favicon } }) => {
  const {
    seo,
    title,
    introduction,
    hourStart,
    hourEnd,
    date,
    address,
    registrationForm,
    image,
    content,
    tags = [],
  } = page;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="white">
        <HeroBasic image={image} />

        <FloatLayout>
          {listEvent && (
            <div className="pre-header">
              <div className="back-btn">
                <Link to={listEvent}>
                  <img src={backBtnIcon} alt="Back button icon" />
                  <span>Alle evenementen</span>
                </Link>
              </div>

              <TagList tags={tags} />
            </div>
          )}

          <h1>{title}</h1>

          {/* Form  */}
          {registrationForm && (
            <div className="form-wrapper">
              <HubspotForm {...registrationForm} />
            </div>
          )}

          {/* Brief information */}
          <div className="brief-information">
            <div className="metadata">
              <span>
                <img src={dateIcon} alt="Date icon" />
                <span>{formatDate(date)}</span>
              </span>

              <span>
                <img src={hourIcon} alt="Hour icon" />
                <span>
                  {hourStart ? hourStart : ''} {hourEnd ? ` - ${hourEnd}` : ''}
                </span>
              </span>

              <span>
                <img src={locationIcon} alt="Location icon" />
                <span>{address}</span>
              </span>
            </div>

            <div>
              <span className="wp-button">
                <span>Deel op WhatsApp</span>
                <ReactSVG src={wpIcon} alt="Wp icon" />
              </span>
            </div>
          </div>

          {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}

          {content?.value && (
            <div className="content">
              <StructuredTextDefault content={content} />
            </div>
          )}
        </FloatLayout>
      </WrapperLayout>
    </Layout>
  );
};

export default Event;

export const PageQuery = graphql`
  query EventById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    listEvent: datoCmsListEvent {
      id
      slug
    }
    page: datoCmsEvent(id: { eq: $id }) {
      id
      title
      slug
      date
      hourStart
      hourEnd
      address
      registrationForm {
        ... on DatoCmsHubspot {
          formId
          region
          portalId
        }
      }
      tags {
        ... on DatoCmsTag {
          id
          title
        }
      }
      introduction
      image {
        gatsbyImageData
        url
      }
      content {
        value
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
