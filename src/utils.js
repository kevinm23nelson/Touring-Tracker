// utils.js
export function fetchData(url, key) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data[key] || !Array.isArray(data[key])) {
        throw new Error(`No ${key} data found or data format incorrect`);
      }
      console.log(`Fetched ${key} data:`, data[key]); // Log fetched data
      return data[key];
    })
    .catch(error => {
      console.error(`Error fetching ${key} data:`, error);
    });
}
