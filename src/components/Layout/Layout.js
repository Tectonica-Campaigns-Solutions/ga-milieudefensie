import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

import '../../styles/main.scss';

function Layout({ children, isHome = false, isDetail = false, bgColor = null }) {
  return (
    <>
      <Header isHome={isHome} isDetail={isDetail} />
      <main id={`${bgColor ? bgColor : ''}`} className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
