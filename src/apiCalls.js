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
    })
    .finally(() => {
      console.log('Fetch attempt finished.');
    });
}

// Example fetch calls
fetchData('http://localhost:3001/api/v1/travelers')
  .then(data => {
    console.log('Travelers:', data);
  })
  .catch(error => {
    console.error('Error fetching travelers:', error);
  });

fetchData('http://localhost:3001/api/v1/trips')
  .then(data => {
    console.log('Trips:', data);
  })
  .catch(error => {
    console.error('Error fetching trips:', error);
  });

fetchData('http://localhost:3001/api/v1/destinations')
  .then(data => {
    console.log('Destinations:', data);
  })
  .catch(error => {
    console.error('Error fetching destinations:', error);
  });

export { fetchData };
