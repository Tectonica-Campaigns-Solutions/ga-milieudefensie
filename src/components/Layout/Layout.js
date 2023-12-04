import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

import '../../styles/main.scss';

function Layout({ children, isHome = false, isDetail = false, isBlueHeader = false }) {
  return (
    <>
      <Header isHome={isHome} isDetail={isDetail} isBlueHeader={isBlueHeader} />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
