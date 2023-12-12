import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import FloatLayout from '../components/Global/FloatLayout/FloatLayout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import Link from '../components/Global/Link/Link';
import backBtnIcon from '../components/Icons/back-btn.svg';
import Blocks from '../components/Blocks';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';

import './event.styles.scss';

const Tool = ({ pageContext, data: { page, listTool, favicon } }) => {
  const { seo, title, introduction, heroImage, content, blocks = [] } = page;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <WrapperLayout variant="white">
        <HeroBasic image={heroImage} />

        {/* Main information */}
        <FloatLayout>
          <div className="back-btn">
            <Link to={listTool}>
              <img src={backBtnIcon} alt="Back button icon" />
              <span>Action Toolkit</span>
            </Link>
          </div>

          <h1>{title}</h1>

          {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}

          {content?.value && (
            <div className="content">
              <StructuredTextDefault content={content} />{' '}
            </div>
          )}
        </FloatLayout>

        {/* Additional blocks */}
        {Array.isArray(blocks) && <Blocks blocks={blocks} />}
      </WrapperLayout>
    </Layout>
  );
};

export default Tool;

export const PageQuery = graphql`
  query ToolById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    listTool: datoCmsListTool {
      id
      slug
    }
    page: datoCmsTool(id: { eq: $id }) {
      id
      title
      slug
      introduction
      heroImage {
        gatsbyImageData
        url
      }
      blocks {
        ... on DatoCmsHighlightTool {
          ...BlockHighlightTools
        }
        ... on DatoCmsTextHubspotForm {
          ...BlockTextHubspot
        }
      }
      content {
        value
        blocks {
          __typename
          ... on DatoCmsImage {
            image {
              url
              gatsbyImageData
              alt
              title
            }
          }
          ... on DatoCmsAcordion {
            id
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
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
