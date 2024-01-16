import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

import '../../styles/main.scss';

function Layout({ children, bgColor = null, extraClassNames = null }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Header setNavOpen={setNavOpen} />
      <main id={`${bgColor ? bgColor : ''}`} className={`main-content ${extraClassNames ? extraClassNames : ''}`}>
        {navOpen && <div className="nav-open-overlay"></div>}

        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
