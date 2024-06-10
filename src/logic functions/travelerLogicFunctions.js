// travelerLogicFunctions.js
import { fetchData } from '../apiCalls';

const travelerPastTrips = async (travelerId) => {
  try {
    const tripsData = await fetchData('http://localhost:3001/api/v1/trips');
    const tripsArray = tripsData.trips; // Accessing the trips array
    const userTrips = tripsArray.filter(trip => trip.userID === travelerId);

    const destinationsData = await fetchData('http://localhost:3001/api/v1/destinations');
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
    });

    return { pastTripsDestinations, recentDestination };
  } catch (error) {
    console.error('Error fetching past trips:', error);
    throw error;
  }
};

export { travelerPastTrips };
