import React from 'react';
import './index.scss';

function SimpleText({ block, custom = false }) {
  return (
    <div className={`simple-text ${custom ? '' : 'container mt-5 mb-5 '}`}>
      <div className={`${custom ? '' : 'row'}`}>
        <div className={`${custom ? '' : 'col'}`}>
          <div dangerouslySetInnerHTML={{ __html: block.text }} />
        </div>
      </div>
    </div>
  );
}

export default SimpleText;
