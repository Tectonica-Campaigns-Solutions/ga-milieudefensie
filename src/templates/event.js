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

import './event.styles.scss';
import { ReactSVG } from 'react-svg';

const Event = ({ pageContext, data: { page, favicon } }) => {
  const { seo, title, introduction, image, content } = page;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroBasic image={image} />

      <FloatLayout>
        <h1>{title}</h1>

        {/* Form  */}

        {/* Brief information */}
        <div className="brief-information">
          <div className="metadata">
            <span>
              <img src={dateIcon} alt="Date icon" />
              <span>Date here...</span>
            </span>

            <span>
              <img src={hourIcon} alt="Hour icon" />
              <span>Hour here...</span>
            </span>

            <span>
              <img src={locationIcon} alt="Location icon" />
              <span>Location here...</span>
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

        {content && (
          <div className="content">
            <StructuredTextDefault content={content} />
          </div>
        )}
      </FloatLayout>
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
    page: datoCmsEvent(id: { eq: $id }) {
      id
      title
      slug
      date
      hourStart
      hourEnd
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
