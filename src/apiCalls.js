// apiCalls.js
import { fetchData } from './utils';

export function fetchAllUserData() {
  return fetchData("http://localhost:3001/api/v1/travelers", "travelers");
}

export function fetchSingleUserData(id) {
  return fetchData(`http://localhost:3001/api/v1/travelers/${id}`, "travelers");
}

export function fetchAllTripsData() {
  return fetchData('http://localhost:3001/api/v1/trips', "trips");
}

export function fetchAllDestinationData() {
  return fetchData('http://localhost:3001/api/v1/destinations', "destinations");
}

// Post
export function addNewTrip(trip) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  })
  .then(response => {
    console.log('Response:', response); // Log the response for debugging
    if (!response.ok) {
      return response.json().then(error => {
        throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
      });
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error adding new trip:', error);
    throw error;
  });
}


