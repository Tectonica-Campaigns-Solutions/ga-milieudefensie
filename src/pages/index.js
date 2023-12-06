import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks';
import HomeHero from '../components/Global/HomeHero/HomeHero';

const IndexPage = ({ data: { page, favicon } }) => {
  return (
    <Layout isHome={true}>
      {page?.seo && <SeoDatoCMS seo={page?.seo} favicon={favicon} homepage />}
      <HomeHero title={page?.title} subtitle={page?.subtitle} image={page?.heroImage} />

      {page?.blocks && <Blocks blocks={page.blocks} />}
    </Layout>
  );
};

export default IndexPage;

export const HomeQuery = graphql`
  query Home {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsHome {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      subtitle
      heroImage {
        gatsbyImageData(width: 1500, height: 800)
      }
      blocks {
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsHighlightEvent {
          ...BlockHighlightEvent
        }
        ... on DatoCmsHighlightTool {
          ...BlockHighlightTools
        }
        ... on DatoCmsTextHubspotForm {
          ...BlockTextHubspot
        }
      }
    }
  }
`;
