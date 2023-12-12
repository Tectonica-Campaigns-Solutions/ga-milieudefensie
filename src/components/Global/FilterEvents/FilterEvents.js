import React, { useState } from 'react';
import EventCard from '../../Blocks/HighlightEvent/EventCard';
import Dropdown from '../Inputs/Dropdown/Dropdown';
import CtaHandler from '../Cta/CtaHandler';

import './styles.scss';

const FilterEvents = ({ events = [] }) => {
  const [eventsFiltered, setEventsFiltered] = useState(events);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTypeOfEvent, setSelectedTypeOfEvent] = useState(null);

  const handleSelectLocation = (value) => setSelectedLocation(value);
  const handleSelectTypeOfEvent = (value) => setSelectedTypeOfEvent(value);

  const hardcodedValues = [{ label: 'Item 1', value: 'Item-1' }];

  return (
    <div className="filter-events-wrapper ">
      <div className="filters">
        <Dropdown title="Locations" options={hardcodedValues} onSelect={handleSelectLocation} />
        <Dropdown title="Type of Event" options={hardcodedValues} onSelect={handleSelectTypeOfEvent} />

        <CtaHandler title="Apply Filter" variant="fill-green" />
      </div>

      <div>
        {eventsFiltered.map((item) => (
          <EventCard event={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FilterEvents;
