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
import CtaHandler from '../components/Global/Cta/CtaHandler';
import Blocks from '../components/Blocks';

import './list-events.styles.scss';

const ListEvents = ({ pageContext, data: { page, allEvents = [], favicon } }) => {
  const { title, seo, highlighEvent, blocks = [] } = page;
  const cmsEvents = Array.isArray(allEvents.edges)
    ? allEvents.edges.map((raw) => ({ ...raw.node, type: 'NATIONAL' }))
    : [];

  const [mergedEvents, setMergedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [filterValues, setFilterValues] = useState({ location: null, typeOfEvent: null });
  const [mobileShowMap, setMobileShowMap] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  useEffect(() => {
    // Fetch CSL events
    async function fetchEvents() {
      setStatus('loading');

      try {
        // Check if we have the data in local storage (5 minutes delay)
        if (localStorage.getItem('events')) {
          const rawEvents = localStorage.getItem('events');
          const parsedEvents = JSON.parse(rawEvents);

          const currentTime = new Date();
          const lastExecutionDate = new Date(parsedEvents.date);
          const timeDifference = (currentTime - lastExecutionDate) / (1000 * 60);

          // Check if have passed 5 minutes, if so, fetch data for request and not from storage
          if (timeDifference <= 5) {
            const cachedEvents = parsedEvents.data;

            setMergedEvents(cachedEvents);
            setFilteredEvents(cachedEvents);
            setLocationOptions([...new Set(cachedEvents.map((event) => event.region))]);

            setStatus('success');
            return;
          } else {
            localStorage.removeItem('events');
          }
        }

        const response = await axios.get(
          process.env.NODE_ENV === 'development' ? '/api/events' : '/.netlify/functions/events'
        );

        const fetchedEvents = response.data.events[0].list;
        const mappedCSL = fetchedEvents.map((e) => ({
          id: e.slug.replace(' ', '_'),
          address: e.location?.query,
          coordinates: { latitude: e.location?.latitude, longitude: e.location?.longitude },
          region: e.location?.region,
          rawDate: e.start_at,
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

        const events = [...cmsEvents, ...mappedCSL].sort((a, b) => {
          const dateA = new Date(a.rawDate);
          const dateB = new Date(b.rawDate);

          return dateB - dateA;
        });

        const uniqueLocations = [...new Set(events.map((event) => event.region))];

        setMergedEvents(events);
        setFilteredEvents(events);
        setLocationOptions(uniqueLocations);
        setStatus('success');

        // Save on storage for caching
        localStorage.setItem('events', JSON.stringify({ date: new Date().getTime(), data: events }));
      } catch (error) {
        console.error('Error fetching events:', error);
        setStatus('error');
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    // Arrow style (up or down)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingUp(scrollY > 1350);

      // Hide float container on footer
      const documentHeight = document.documentElement.scrollHeight;
      setIsArrowVisible(scrollY < documentHeight - 1200);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [status]);

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

  useEffect(() => {
    const handleWindowResize = () => {
      const htmlElement = document.documentElement;

      if (mobileShowMap && window.innerWidth < 992) {
        htmlElement.style.overflow = 'hidden';
      } else {
        htmlElement.style.overflow = '';
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [mobileShowMap]);

  const isLoading = status === 'loading';

  return (
    <Layout bgColor="secondary-bg" extraClassNames="list-pages">
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="light" responsiveVariant="secondary-bg">
        <HeroBasic backgroundColor="light" responsiveVariant="event" />

        <div className="list-event-wrapper">
          <div className="container">
            <h1>{title}</h1>

            {/* Mobile button */}
            {!isLoading && (
              <div className="mobile-view-map">
                <CtaHandler
                  title={'Map View'}
                  isPrimaryButton
                  handleOnClick={() => setMobileShowMap((prev) => !prev)}
                />
              </div>
            )}

            {highlighEvent && (
              <div className="highlighted-event-wrapper">
                <EventCard event={highlighEvent} isHighlighted />
              </div>
            )}

            <div className={`${mobileShowMap ? 'mobile-map' : ''}`}>
              <Map
                title="Evenementen"
                data={filteredEvents}
                mobileView={mobileShowMap}
                setMobileView={setMobileShowMap}
              />

              {isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spinner />
                </div>
              ) : (
                <>
                  <FilterEvents
                    events={filteredEvents}
                    locations={locationOptions}
                    handleOnApplyNewFilters={(newFilterValues) => setFilterValues(newFilterValues)}
                  />

                  {/* Fixed cta to view all */}
                  <div className={`cta-view-list ${isArrowVisible ? '' : 'hide'}`}>
                    <div
                      className="custom-btn custom-btn-primary"
                      onClick={() => {
                        const targetElement = document.getElementById('filter-events-list');

                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Bekijk lijst
                      {/* Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        className={`icon-arrow-list ${isScrollingUp ? 'up' : 'down'}`}
                      >
                        <path
                          d="M15.5 7.5L10.5 12.5L5.5 7.5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {Array.isArray(blocks) && blocks.length > 0 && (
            <div className="mt-5 pb-5">
              <Blocks blocks={blocks} />
            </div>
          )}
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
          rawDate: date
          hourStart
          hourEnd
          address
          region
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
      blocks {
        ... on DatoCmsTextHubspotForm {
          ...BlockTextHubspot
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
