import React from 'react';
import './index.scss';

function SimpleText({ block, custom = false, limitedWidth = false }) {
  return (
    <div className={`${custom ? '' : 'container mt-5 mb-5 '} `}>
      <div className={`simple-text ${limitedWidth ? 'limited-with' : ''}`}>
        <div className={`${custom ? '' : 'row'}`}>
          <div className={`${custom ? '' : 'col'}`}>
            <div dangerouslySetInnerHTML={{ __html: block.text }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleText;
