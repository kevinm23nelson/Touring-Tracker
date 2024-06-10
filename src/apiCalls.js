function fetchData(url, options = {}) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; 
    });
}

function loadData() {
  return Promise.all([
    fetchData('http://localhost:3001/api/v1/travelers'),
    fetchData('http://localhost:3001/api/v1/trips'),
    fetchData('http://localhost:3001/api/v1/destinations')
  ]).then(([travelers, trips, destinations]) => ({
    travelers,
    trips,
    destinations
  }));
}

export { fetchData, loadData };
