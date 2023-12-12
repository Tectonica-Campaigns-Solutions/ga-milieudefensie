export const pathToModel = (model = null, slug = '') => {
  if (model === 'basicPage') {
    return `/${slug}`;
  } else if (model === 'event') {
    return `/event/${slug}`;
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
