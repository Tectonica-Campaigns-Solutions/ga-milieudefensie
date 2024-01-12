import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

import '../../styles/main.scss';

function Layout({ children, isHome = false, isDetail = false, bgColor = null }) {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <>
      <Header isHome={isHome} isDetail={isDetail} setNavOpen={setNavOpen} />
      <main id={`${bgColor ? bgColor : ''}`} className={`main-content nav-open}`}>
        {navOpen && <div className="nav-open-overlay"></div>}

        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
