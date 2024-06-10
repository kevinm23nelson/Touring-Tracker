import { fetchData } from '../apiCalls';

const travelerPastTrips = (travelerId, tripsData, destinationsData) => {
  if (!Array.isArray(tripsData.trips)) {
    throw new Error('Trips data is not an array');
  }
  if (!Array.isArray(destinationsData.destinations)) {
    throw new Error('Destinations data is not an array');
  }

  const tripsArray = tripsData.trips; // Accessing the trips array
  const userTrips = tripsArray.filter(trip => trip.userID === travelerId);

  if (userTrips.length === 0) {
    return { pastTripsDestinations: [], recentDestination: undefined };
  }

  const destinationsArray = destinationsData.destinations; // Accessing the destinations array

  // Find the most recent trip
  const mostRecentTrip = userTrips.reduce((latest, trip) => {
    return new Date(trip.date) > new Date(latest.date) ? trip : latest;
  }, userTrips[0]);


  // Find the destination details for the most recent trip
  const recentDestination = destinationsArray.find(destination => destination.id === mostRecentTrip.destinationID);

  // Get all past trips' destination names
  const pastTripsDestinations = userTrips.map(trip => {
    const destination = destinationsArray.find(destination => destination.id === trip.destinationID);
    return destination ? destination.destination : '';
  }).filter(destination => destination !== ''); // Filter out empty strings

  return { pastTripsDestinations, recentDestination };
};

export { travelerPastTrips };
