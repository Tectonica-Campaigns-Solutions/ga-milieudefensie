import React, { useState, useEffect } from 'react';
import Link from '../Link/Link';
import headerLogo from '../../Icons/Logo Component.svg';
import { ReactSVG } from 'react-svg';
import hamburgerIcon from '../../Icons/Hamburguer Icon.svg';
import wpNavigationIcon from '../../Icons/Whatsapp Navigation.svg';

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

export default function Nav({ navData, topMenu, navbarWhite = false, location }) {
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
    <nav className={`navbar fixed-top`}>
      <div className="container">
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
            <ReactSVG src={hamburgerIcon} />
          </button>

          <ReactSVG src={wpNavigationIcon} />
        </div>

        <div className={`offcanvas offcanvas-end ${expanded ? 'show' : ''}`} tabIndex={-1}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <div className="links-container">
                {groupedLinks.links.map((link) =>
                  link.treeChildren.length === 0 ? (
                    <LinkItem key={link.id} link={link} label={link?.title} isButton={link?.isButton} />
                  ) : (
                    <DropdownItem key={link.id} link={link} label={link?.title} children={link?.treeChildren} />
                  )
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
