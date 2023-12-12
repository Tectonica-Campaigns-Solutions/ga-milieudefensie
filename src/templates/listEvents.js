import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import EventCard from '../components/Blocks/HighlightEvent/EventCard';
import Map from '../components/Global/Map/Map';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';

import './list-events.styles.scss';

const ListEvents = ({ pageContext, data: { page, allEvents = [], favicon } }) => {
  const { seo, title, highlighEvent } = page;
  const mappedEvents = Array.isArray(allEvents.edges) ? allEvents.edges.map((raw) => raw.node) : [];

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="light">
        <HeroBasic title={title} backgroundColor={'light'} />

        <div className="list-event-wrapper">
          <div className="container">
            {highlighEvent && (
              <div className="highlighted-event-wrapper">
                <EventCard event={highlighEvent} isHighlighted />
              </div>
            )}

            {/* Map */}
            <Map />

            {/* Filter events */}
            <FilterEvents events={mappedEvents} />
          </div>
        </div>
      </WrapperLayout>
    </Layout>
  );
};

export default ListEvents;

export const PageQuery = graphql`
  query ListEventById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    allEvents: allDatoCmsEvent {
      edges {
        node {
          id
          title
          slug
          introduction
          date
          hourStart
          hourEnd
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
    }
    page: datoCmsListEvent(id: { eq: $id }) {
      id
      title
      slug
      highlighEvent {
        ... on DatoCmsEvent {
          id
          title
          slug
          introduction
          date
          hourStart
          hourEnd
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
