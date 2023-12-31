import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import Map from '../components/Global/Map/Map';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';
import ListGroupBlock from '../components/Blocks/HighlightGroup/ListGroups';
import CtaHandler from '../components/Global/Cta/CtaHandler';
import Blocks from '../components/Blocks';

import './list-events.styles.scss';

const ListGroups = ({ pageContext, data: { page, allGroups = [], favicon } }) => {
  const { seo, title, blocks = [] } = page;
  const mappedGroups = Array.isArray(allGroups.edges) ? allGroups.edges.map((raw) => raw.node) : [];

  const [mobileShowMap, setMobileShowMap] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  useEffect(() => {
    // Arrow style (up or down)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingUp(scrollY > 500);

      // Hide float container on footer
      const documentHeight = document.documentElement.scrollHeight;
      setIsArrowVisible(scrollY < documentHeight - 1200);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="light">
        <HeroBasic backgroundColor="light" responsiveVariant="event" />

        <div className="list-event-wrapper pt-4">
          <div className="container">
            <h1>{title}</h1>

            {/* Mobile button */}
            <div className="mobile-view-map mb-4">
              <CtaHandler title={'Map View'} isPrimaryButton handleOnClick={() => setMobileShowMap((prev) => !prev)} />
            </div>

            {/* Map */}
            <Map
              title={title}
              data={mappedGroups}
              type="group"
              mobileView={mobileShowMap}
              setMobileView={setMobileShowMap}
            />

            {Array.isArray(mappedGroups) && (
              <ListGroupBlock items={mappedGroups} withPagination withContainer={false} />
            )}

            {/* Fixed cta to view all */}
            <div className={`cta-view-list ${isArrowVisible ? '' : 'hide'}`}>
              <div
                className="custom-btn custom-btn-primary"
                onClick={() => {
                  const targetElement = document.getElementById('groups-list');

                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Show Local Groups List
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

export default ListGroups;

export const PageQuery = graphql`
  query ListGroupById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    allGroups: allDatoCmsGroup {
      edges {
        node {
          id
          title
          slug
          address
          coordinates {
            latitude
            longitude
          }
          model {
            apiKey
          }
          image {
            url
            gatsbyImageData
          }
          tags {
            ... on DatoCmsTag {
              id
              title
            }
          }
        }
      }
    }
    page: datoCmsListGroup(id: { eq: $id }) {
      id
      title
      slug
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
