export const pathToModel = (model = null, slug = '') => {
  if (model === 'basicPage') {
    return `/${slug}`;
  } else if (model === 'event') {
    return `/event/${slug}`;
  } else if (model === 'tool') {
    return `/action/${slug}`;
  } else if (model === 'group') {
    return `/group/${slug}`;
  } else {
    return `/${slug}`;
  }
};

export const isArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const getCtaUrl = (cta) => {
  if (typeof cta === 'string') {
    return '/' + cta;
  }

  if (cta.model) {
    const { apiKey: model } = cta.model;
    return pathToModel(model, cta.slug);
  }

  if (cta.content?.model) {
    const { apiKey: model } = cta.content?.model;
    return pathToModel(model, cta.content?.slug);
  }

  if (cta.link?.content?.model) {
    const { apiKey: model } = cta.link?.content?.model;
    return pathToModel(model, cta.link?.content?.slug);
  }

  if (cta.content?.slug) {
    return `/${cta.content.slug}`;
  }

  if (cta.slug) {
    return `/${cta.slug}`;
  }

  const url = cta.link?.content ? '/' + cta.link?.content?.slug : cta.link?.url;
  return url;
};

export const formatDate = (rawDate) => {
  if (!rawDate) {
    return 'Invalid date';
  }

  // Create a date object from the date string
  const date = new Date(rawDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Get the month name
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[date.getMonth()];

  // Get the day and year
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};

export const formatDateAsYYMMDD = (rawDate) => {
  const date = new Date(rawDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const newDateString = `${year}-${month}-${day}`;
  return newDateString;
};

export const convertTime = (dateTimeString) => {
  var date = new Date(dateTimeString);

  // Get hours and minutes
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Determine AM or PM
  var period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var formattedTime = hours + ':' + minutes + ' ' + period;

  return formattedTime;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};

export const MapCountry = {
  DR: 'Drenthe',
  FL: 'Flevoland',
  FR: 'Fryslân',
  GE: 'Gelderland',
  GR: 'Groningen',
  LI: 'Limburg',
  NB: 'Noord-Brabant',
  NH: 'Noord-Holland',
  OV: 'Overijssel',
  UT: 'Utrecht',
  ZE: 'Zeeland',
  ZH: 'Zuid-Holland',
};
