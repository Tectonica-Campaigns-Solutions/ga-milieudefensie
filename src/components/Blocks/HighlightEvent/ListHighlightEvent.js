import React from 'react';
import EventCard from './EventCard';
import CtaList from '../../Global/Cta/CtaList';

import './styles.scss';

const ListHighlightEvent = ({ block }) => {
  const { sectionTitle, cta = [], items = [] } = block;

  return (
    <section className="highlight-event-section">
      <div className="container">
        <div className="header">
          <h3>{sectionTitle}</h3>
          <CtaList ctas={cta} />
        </div>

        {/* Items */}
        <div className="content">
          {items.map((item) => (
            <EventCard event={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListHighlightEvent;
