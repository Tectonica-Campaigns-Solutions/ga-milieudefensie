import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment MainNavigation on DatoCmsMenuItem {
    id
    title
    position
    externalUrl
    isButton
    content {
      ... on DatoCmsBasicPage {
        slug
        model {
          apiKey
        }
      }
    }
    treeChildren {
      ... on DatoCmsMenuItem {
        id
        title
        position
        externalUrl
        content {
          ... on DatoCmsBasicPage {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
  }

  fragment BlockText on DatoCmsSimpleText {
    id: originalId
    __typename
    text
  }

  fragment BlockLogos on DatoCmsLogo {
    __typename
    title
    id
    item {
      id
      externalLink
      image {
        gatsbyImageData
        url
      }
    }
  }

  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    preTitle
    title
    alignment
    textContent
    backgroundColor
    image {
      gatsbyImageData(width: 800)
      alt
      url
    }
    xlImage: image {
      gatsbyImageData(width: 1200)
      alt
      url
    }
    imageMobile {
      gatsbyImageData(width: 500)
      alt
      url
    }
    video {
      id
      source {
        url
        thumbnailUrl
      }
      preview {
        gatsbyImageData
        url
      }
    }
    ctas {
      ... on DatoCmsCta {
        id
        title
        isButton
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsBasicPage {
                id
                slug
              }
            }
          }
        }
      }
    }
  }

  fragment BlockAccordion on DatoCmsAcordion {
    __typename
    id: originalId
    items {
      title
      text
    }
  }

  fragment BlockImage on DatoCmsImage {
    __typename
    id: originalId
    image {
      gatsbyImageData
      title
    }
  }

  fragment BlockTable on DatoCmsTable {
    __typename
    id: originalId
    table
  }

  fragment BlockEmbedIframe on DatoCmsEmbedIframe {
    __typename
    id: originalId
    iframeCode
  }

  fragment BlockVideo on DatoCmsVideoBlock {
    __typename
    id: originalId
    video {
      url
      thumbnailUrl
    }
  }
`;
