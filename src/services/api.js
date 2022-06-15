import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26225007-03edf0f89f8f7aca6e8b387a9';

export default function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    q: searchQuery,
    page: page,
    per_page: 12,
  });

  return fetch(`${BASE_URL}?${searchParams}`);
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};

// function fetchImages(value, page) {
//   const KEY = '26225007-03edf0f89f8f7aca6e8b387a9';
//   const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

//   return fetch(URL).then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error('Oops, something went wrong'));
//   });
// }

// const api = { fetchImages };

// export default api;
