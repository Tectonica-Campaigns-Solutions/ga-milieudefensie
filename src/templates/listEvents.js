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
import { convertTime, formatDateAsYYMMDD } from '../utils';

import './list-events.styles.scss';

const ListEvents = ({ pageContext, data: { page, allEvents = [], favicon } }) => {
  const { seo, highlighEvent } = page;
  const cmsEvents = Array.isArray(allEvents.edges)
    ? allEvents.edges.map((raw) => ({ ...raw.node, type: 'NATIONAL' }))
    : [];

  const [mergedEvents, setMergedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [filterValues, setFilterValues] = useState({ location: null, typeOfEvent: null });

  useEffect(() => {
    async function fetchEvents() {
      setStatus('loading');

      try {
        const response = await axios.get('/api/events');
        const fetchedEvents = response.data.events;
        const mappedCSL = fetchedEvents.map((e) => ({
          id: e.slug.replace(' ', '_'),
          address: e.location?.query,
          coordinates: { latitude: e.location?.latitude, longitude: e.location?.longitude },
          region: e.location?.region,
          date: formatDateAsYYMMDD(e.start_at),
          hourStart: convertTime(e.start_at),
          hourEnd: e.end_at ? convertTime(e.end_at) : null,
          introduction: e.description,
          slug: e.slug,
          url: e.url,
          title: e.title,
          image: { url: e.image_url },
          type: 'INTERNATIONAL',
        }));

        const events = [...cmsEvents, ...mappedCSL];
        const uniqueLocations = [...new Set(events.map((event) => event.region))];

        setMergedEvents(events);
        setFilteredEvents(events);
        setLocationOptions(uniqueLocations);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching events:', error);
        setStatus('error');
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const filteredEvents = [...mergedEvents]
      .filter(
        (e) => filterValues.location === null || filterValues.location === 'All' || e.region === filterValues.location
      )
      .filter(
        (e) =>
          filterValues.typeOfEvent === null || filterValues.typeOfEvent === 'All' || e.type === filterValues.typeOfEvent
      );

    setFilteredEvents(filteredEvents);
  }, [filterValues, mergedEvents]);

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
                <Map title="Evenementen" data={filteredEvents} />

                <FilterEvents
                  events={filteredEvents}
                  locations={locationOptions}
                  handleOnApplyNewFilters={(newFilterValues) => setFilterValues(newFilterValues)}
                />
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
