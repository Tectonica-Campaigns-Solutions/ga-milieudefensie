import React, { useState } from 'react';
import EventCard from '../../Blocks/HighlightEvent/EventCard';
import Dropdown from '../Inputs/Dropdown/Dropdown';
import CtaHandler from '../Cta/CtaHandler';
import ListPaginated from '../Pagination/ListPaginated';

import './styles.scss';

const FilterEvents = ({ events = [], locations, handleOnApplyNewFilters }) => {
  const [location, setLocation] = useState(null);
  const [typeOfEvent, setTypeOfEvent] = useState(null);

  const locationsValues = [
    { label: 'All', value: 'All' },
    ...locations
      .filter((l) => l)
      .map((l) => {
        return { label: l, value: l };
      }),
  ];

  const eventsType = [
    { label: 'All', value: 'All' },
    { label: 'National', value: 'NATIONAL' },
    { label: 'International', value: 'INTERNATIONAL' },
  ];

  const handleFilter = () => {
    handleOnApplyNewFilters({ location, typeOfEvent });
  };

  return (
    <div className="filter-events-wrapper ">
      <div className="filters">
        <Dropdown title="Locations" options={locationsValues} onSelect={(value) => setLocation(value)} />
        <Dropdown title="Type of Event" options={eventsType} onSelect={(value) => setTypeOfEvent(value)} />

        <CtaHandler title="Apply Filter" variant="fill-green" handleOnClick={handleFilter} />
      </div>

      <div>
        {/* events.map((item) => <EventCard event={item} key={item.id} />) */}
        {events.length > 0 ? (
          <ListPaginated
            list={events}
            customPageSize={10}
            renderItem={(item, index) => <EventCard event={item} key={item.id} />}
          />
        ) : (
          <h5>No events found.</h5>
        )}
      </div>
    </div>
  );
};

export default FilterEvents;
