import { fetchAllUserData, fetchSingleUserData, fetchAllTripsData, fetchAllDestinationData } from './apiCalls';

let allUsersData = [];
let allTripData = [];
let allDestinationData = [];
let allSingleUserData = [];

export const fetchAllData = (userId) => {
  return Promise.all([
    fetchAllUserData(),
    fetchSingleUserData(userId),
    fetchAllTripsData(),
    fetchAllDestinationData()
  ]).then(([allUserDataResult, singleUserDataResult, allTripsDataResult, allDestinationDataResult]) => {
    allUsersData = allUserDataResult;
    allTripData = allTripsDataResult;
    allDestinationData = allDestinationDataResult;
    allSingleUserData = singleUserDataResult;
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
};

// Export the data
export {
  allUsersData,
  allTripData,
  allDestinationData,
  allSingleUserData
};
