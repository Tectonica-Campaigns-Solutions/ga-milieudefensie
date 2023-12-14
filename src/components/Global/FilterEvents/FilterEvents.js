import React, { useState } from 'react';
import EventCard from '../../Blocks/HighlightEvent/EventCard';
import Dropdown from '../Inputs/Dropdown/Dropdown';
import CtaHandler from '../Cta/CtaHandler';

import './styles.scss';

const FilterEvents = ({ events = [], handleOnApplyNewFilters }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTypeOfEvent, setSelectedTypeOfEvent] = useState(null);

  const handleSelectLocation = (value) => setSelectedLocation(value);
  const handleSelectTypeOfEvent = (value) => setSelectedTypeOfEvent(value);

  // Values for filters
  const hardcodedValues = [{ label: 'Item 1', value: 'Item-1' }];

  const eventsType = [
    { label: 'All', value: 'all' },
    { label: 'National', value: 'national' },
    { label: 'International', value: 'international' },
  ];

  const handleFilter = () => {
    console.log('Filter new items...');
    const newEvents = [...events];

    console.log({ selectedLocation, selectedTypeOfEvent });
    // handleOnApplyNewFilters([]);
  };

  return (
    <div className="filter-events-wrapper ">
      <div className="filters">
        <Dropdown title="Locations" options={hardcodedValues} onSelect={handleSelectLocation} />
        <Dropdown title="Type of Event" options={eventsType} onSelect={handleSelectTypeOfEvent} />

        <CtaHandler title="Apply Filter" variant="fill-green" handleOnClick={handleFilter} />
      </div>

      <div>
        {events.map((item) => (
          <EventCard event={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FilterEvents;
