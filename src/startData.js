// startData.js
import { fetchAllUserData, fetchSingleUserData, fetchAllTripsData, fetchAllDestinationData } from './apiCalls';

let allUsersData = [];
let allTripData = [];
let allDestinationData = [];
let allSingleUserData = {};

export const fetchAllData = (userId) => {
  return Promise.all([
    fetchAllUserData(),
    fetchSingleUserData(userId),
    fetchAllTripsData(),
    fetchAllDestinationData()
  ]).then(([users, singleUser, trips, destinations]) => {
    allUsersData = users.travelers;
    allSingleUserData = singleUser;
    allTripData = trips.trips;
    allDestinationData = destinations.destinations;
    console.log('Fetched all data:', { allUsersData, allSingleUserData, allTripData, allDestinationData });
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
};

export { allUsersData, allTripData, allDestinationData, allSingleUserData };
