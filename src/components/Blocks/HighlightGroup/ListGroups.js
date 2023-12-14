import React from 'react';
import GroupCard from './GroupCard';

import './styles.scss';

const ListGroupBlock = ({ items = [] }) => {
  return (
    <div className="container pb-5">
      <div className="row gy-4">
        {items.map((item) => (
          <div className="col-lg-4" key={item.id}>
            <GroupCard group={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGroupBlock;
