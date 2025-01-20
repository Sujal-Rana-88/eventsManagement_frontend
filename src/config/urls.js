// const BASE_URL = 'https://eventsmanagement-backend.onrender.com';
const BASE_URL = 'http://localhost:5000';

const API_URLS = {
  LOGIN: `${BASE_URL}/create-user`,
  FETCH_EVENTS: `${BASE_URL}/events`,
  CREATE_EVENT: `${BASE_URL}/events/create`,
};

export default API_URLS;
