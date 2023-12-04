import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import { isBlueColor } from '../utils';

const Page = ({ pageContext, data: { page, favicon } }) => {
  const {
    seo,
    title,
    backgroundImage,
    backgroundImageMobile,
    backgroundImageAlignment,
    backgroundColorHero,
    blocks = [],
  } = page;

  return (
    <Layout isBlueHeader={isBlueColor(backgroundColorHero)}>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      {/* <HeroBasic
        title={title}
        image={backgroundImage}
        imageMobile={backgroundImageMobile}
        imageAlignment={backgroundImageAlignment}
        backgroundColor={backgroundColorHero}
      /> */}

      <div className="inner-page">
        <Blocks blocks={blocks} />
      </div>
    </Layout>
  );
};

export default Page;

export const PageQuery = graphql`
  query PageById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsBasicPage(id: { eq: $id }) {
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsAcordion {
          ...BlockAccordion
        }
        ... on DatoCmsSimpleText {
          ...BlockText
        }
        ... on DatoCmsVideoBlock {
          ...BlockVideo
        }
        ... on DatoCmsTable {
          ...BlockTable
        }
      }
    }
  }
`;
