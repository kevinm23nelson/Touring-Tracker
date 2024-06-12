// utils.js
export function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Fetched data from ${url}:`, data); // Log fetched data
      return data;
    })
    .catch(error => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
}
