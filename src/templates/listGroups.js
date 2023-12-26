import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import Map from '../components/Global/Map/Map';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';
import ListGroupBlock from '../components/Blocks/HighlightGroup/ListGroups';

import './list-events.styles.scss';
import CtaHandler from '../components/Global/Cta/CtaHandler';

const ListGroups = ({ pageContext, data: { page, allGroups = [], favicon } }) => {
  const { seo, title } = page;
  const mappedGroups = Array.isArray(allGroups.edges) ? allGroups.edges.map((raw) => raw.node) : [];

  const [mobileShowMap, setMobileShowMap] = useState(false);

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="light">
        <HeroBasic backgroundColor="light" responsiveVariant="event" />

        <div className="list-event-wrapper pt-4">
          <div className="container">
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

            {Array.isArray(mappedGroups) && <ListGroupBlock items={mappedGroups} />}
          </div>
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
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
