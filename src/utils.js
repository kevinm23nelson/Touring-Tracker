// utils.js
export function fetchData(url, key) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data[key] || !Array.isArray(data[key])) {
          throw new Error(`No ${key} data found or data format incorrect`);
        }
        return data[key];
      })
      .catch(error => console.error(`Error fetching ${key} data:`, error));
  }
  