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
import ListHighlightEvent from '../components/Blocks/HighlightEvent/ListHighlightEvent';

import './event.styles.scss';

const Group = ({ pageContext, data: { page, listGroup, listEvent, favicon } }) => {
  const {
    seo,
    title,
    introduction,
    registrationForm,
    image,
    content,
    email,
    whatsappGroup,
    organizer,
    tags = [],
    relatedEvents = [],
  } = page;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="white">
        <HeroBasic image={image} />

        <FloatLayout>
          {listGroup && (
            <div className="pre-header">
              <div className="back-btn">
                <Link to={listGroup}>
                  <img src={backBtnIcon} alt="Back button icon" />
                  <span>Bekijk alle groepen</span>
                </Link>
              </div>

              {Array.isArray(tags) && <TagList tags={tags} />}
            </div>
          )}

          {title && <h1>{title}</h1>}
          {introduction && <div className="alt-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}

          {/* Form  */}
          {registrationForm && (
            <div className="form-wrapper">
              <HubspotForm {...registrationForm} />
            </div>
          )}

          {/* Brief information */}
          <div className="brief-information">
            <div className="metadata">
              {email && (
                <span>
                  <img src={dateIcon} alt="Email icon" />
                  <span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </span>
                </span>
              )}

              {whatsappGroup && (
                <span>
                  <img src={hourIcon} alt="Whatsapp Group icon" />
                  <span>
                    <a href={`https://wa.me/${whatsappGroup}`} target="_blank" rel="noopener noreferrer">
                      Whatsapp Group
                    </a>
                  </span>
                </span>
              )}

              {organizer && (
                <span>
                  <img src={locationIcon} alt="Organizer icon" />
                  <span>Lokale organizer: {organizer}</span>
                </span>
              )}
            </div>

            {whatsappGroup && (
              <div>
                <a
                  className="wp-button"
                  href={`https://wa.me/${whatsappGroup}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>WhatsApp Group Chat</span>
                  <ReactSVG src={wpIcon} alt="Wp icon" />
                </a>
              </div>
            )}
          </div>

          {content?.value && (
            <div className="content">
              <StructuredTextDefault content={content} />
            </div>
          )}
        </FloatLayout>

        {/* Related events */}
        {Array.isArray(relatedEvents) && (
          <div className="related-section">
            <ListHighlightEvent
              block={{
                sectionTitle: 'Events organized by this Group',
                cta: [{ ...listEvent, title: 'See Full Calendar' }],
                items: relatedEvents,
              }}
            />
          </div>
        )}
      </WrapperLayout>
    </Layout>
  );
};

export default Group;

export const PageQuery = graphql`
  query GroupById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    listGroup: datoCmsListGroup {
      id
      slug
    }
    listEvent: datoCmsListEvent {
      id
      slug
    }
    page: datoCmsGroup(id: { eq: $id }) {
      id
      title
      slug
      address
      email
      whatsappGroup
      organizer
      introduction
      registrationForm {
        ... on DatoCmsHubspot {
          formId
          region
          portalId
        }
      }
      image {
        gatsbyImageData
        url
      }
      content {
        value
        blocks {
          __typename
          ... on DatoCmsImage {
            id: originalId
            image {
              gatsbyImageData(width: 700)
              title
              url
            }
          }
          ... on DatoCmsAcordion {
            id: originalId
            items {
              ... on DatoCmsAcordionItem {
                id
                title
                text
              }
            }
          }
        }
      }
      tags {
        ... on DatoCmsTag {
          id
          title
        }
      }
      relatedEvents {
        ... on DatoCmsEvent {
          id
          title
          slug
          introduction
          date
          hourStart
          hourEnd
          address
          tags {
            ... on DatoCmsTag {
              id
              title
            }
          }
          image {
            gatsbyImageData
          }
          model {
            apiKey
          }
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
