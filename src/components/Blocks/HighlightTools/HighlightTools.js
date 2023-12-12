import React from 'react';
import ToolCard from './ToolCard';

import './styles.scss';

const HighlightTools = ({ block }) => {
  const { sectionTitle, items = [] } = block;

  return (
    <section className="highlight-tools-section">
      <div className="container">
        {sectionTitle && (
          <div className="header">
            <h3>{sectionTitle}</h3>
          </div>
        )}

        {/* Items */}
        <div className="content">
          <div className="row gy-4">
            {items.map((item) => (
              <div className="col-lg-4" key={item.id}>
                <ToolCard tool={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightTools;
