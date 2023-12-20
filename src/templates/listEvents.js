import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import EventCard from '../components/Blocks/HighlightEvent/EventCard';
import Map from '../components/Global/Map/Map';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';
import axios from 'axios';
import Spinner from '../components/Global/Spinner/Spinner';

import './list-events.styles.scss';
import { formatDateAsYYMMDD } from '../utils';

const ListEvents = ({ pageContext, data: { page, allEvents = [], favicon } }) => {
  const { seo, title, highlighEvent } = page;
  const cmsEvents = Array.isArray(allEvents.edges)
    ? allEvents.edges.map((raw) => ({ ...raw.node, type: 'NATIONAL' }))
    : [];

  const [cslEvents, setCslEvents] = useState([]);
  const [mergedEvents, setMergedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    async function fetchEvents() {
      setStatus('loading');

      try {
        const response = await axios.get('/api/events');
        const fetchedEvents = response.data.events;
        const mappedCSL = fetchedEvents.map((e) => ({
          id: 'id',
          address: '',
          coordinates: { latitude: e.location?.latitude || 54, longitude: e.location?.longitude || 54 },
          region: e.location?.region,
          date: formatDateAsYYMMDD(e.start_at),
          hourEnd: '9:00 PM',
          hourStart: '5:00 AM',
          introduction: e.description,
          slug: e.slug,
          url: e.url,
          title: e.title,
          type: 'INTERNATIONAL',
        }));

        setCslEvents(mappedCSL);
        setMergedEvents([...cmsEvents, ...mappedCSL]);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching events:', error);
        setStatus('error');
      }
    }

    fetchEvents();
  }, []);

  const isLoading = status === 'loading';

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="light">
        <HeroBasic backgroundColor={'light'} />

        <div className="list-event-wrapper">
          <div className="container">
            {highlighEvent && (
              <div className="highlighted-event-wrapper">
                <EventCard event={highlighEvent} isHighlighted />
              </div>
            )}

            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <Spinner />
              </div>
            ) : (
              <>
                {/* Map */}
                <Map title="Evenementen" data={mergedEvents} />

                {/* Filter events */}
                <FilterEvents events={mergedEvents} handleOnApplyNewFilters={(events) => setFilteredEvents(events)} />
              </>
            )}
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
          address
          coordinates {
            latitude
            longitude
          }
          tags {
            ... on DatoCmsTag {
              id
              title
            }
          }
          image {
            url
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
