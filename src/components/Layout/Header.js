import * as React from 'react';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import Nav from '../Global/Nav/Nav';

const Header = ({ isHome, isDetail }) => {
  const menus = useStaticQuery(graphql`
    query {
      mainMenu: allDatoCmsMenuItem(filter: { root: { eq: true } }, sort: { position: ASC }) {
        nodes {
          ...MainNavigation
        }
      }
      configuration: datoCmsSiteConfiguration {
        whatsappGroup
      }
    }
  `);

  return (
    <header data-datocms-noindex className={`${isHome ? 'header-home' : ''} ${isDetail ? 'header-detail' : ''}`}>
      <Nav navData={menus.mainMenu} config={menus.configuration} />
    </header>
  );
};

export default Header;
