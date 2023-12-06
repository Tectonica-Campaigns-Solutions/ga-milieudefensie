import React, { useState, useEffect } from 'react';
import Link from '../Link/Link';
import headerLogo from '../../Icons/Logo Component.svg';
import Cta from '../Cta/Cta';
import { ReactSVG } from 'react-svg';

import './index.scss';

const LinkItem = ({ link, label, isButton }) => {
  return (
    <li className="nav-item">
      <Link to={link} className={isButton ? 'btn btn-primary' : ''}>
        {label}
      </Link>
    </li>
  );
};

const DropdownItem = ({ link, label, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1200) {
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1200) {
      setDropdownOpen(false);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1200) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <li className="dropdown nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={link} onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
        {label}
      </Link>

      <ul className={`dropdown-menu ${dropdownOpen ? 'open' : null}`}>
        {children
          ?.sort((a, b) => a.position - b.position)
          .map((link) => (
            <li className="dropdown-item" key={link.id}>
              <Link className="dropdown-link" to={link}>
                {link?.title}
              </Link>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default function Nav({
  navData,
  topMenu,
  navbarWhite = false,
  location,
  enableSearchEngine = false,
  setSearchEngineVisible = null,
  isBlueHeader = false,
}) {
  const navLinks = navData.nodes;

  const [expanded, setExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Use effect for sticky nav
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (typeof window !== 'undefined') {
          const position = window.pageYOffset;
          setScrollPosition(position);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleNavClick = () => {
    setExpanded(!expanded);
  };

  const isHome = location ? location?.pathname === '/' : false;

  const groupedLinks = navLinks.reduce(
    (result, item) => {
      if (item.isButton) {
        result.ctas.push(item);
      } else {
        result.links.push(item);
      }
      return result;
    },
    { ctas: [], links: [] }
  );

  return (
    <div className="container">
      {/* Main navbar */}
      <nav className={`navbar navbar-expand-xl ${isHome ? 'home-nav' : ''} ${expanded ? 'expanded' : ''}`}>
        <Link className="navbar-brand" to={'/'}>
          <ReactSVG src={headerLogo} alt="Milieudefensie logo" />
        </Link>

        <div className="actions">
          <button
            type="button"
            data-target="#navNav"
            aria-expanded="false"
            aria-controls="navNav"
            data-toggle="collapse"
            className="navbar-toggler"
            aria-label="Toggle navigation"
            onClick={() => handleNavClick()}
          >
            <span className={`${expanded ? 'open-toggle ' : ''} navbar-toggler-icon`} />
          </button>
        </div>

        <div className={`${expanded ? 'show' : ''} collapse navbar-collapse`} id="navNav">
          <ul className={`main-items navbar-nav mr-auto ${navbarWhite ? 'nav-white' : ''}`}>
            <div className="links-container">
              {groupedLinks.links.map((link) =>
                link.treeChildren.length === 0 ? (
                  <LinkItem key={link.id} link={link} label={link?.title} isButton={link?.isButton} />
                ) : (
                  <DropdownItem key={link.id} link={link} label={link?.title} children={link?.treeChildren} />
                )
              )}
            </div>

            {/* <Cta */}
            {groupedLinks.ctas && (
              <div className="cta-list-container">
                {groupedLinks.ctas.map((cta) => (
                  <Cta cta={cta} key={cta.id} isButton />
                ))}
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
