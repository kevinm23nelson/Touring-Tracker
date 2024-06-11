import { allTripData, allDestinationData } from '../startData';

const travelerPastTrips = (travelerId, tripsArray = allTripData, destinationsArray = allDestinationData) => {
  const today = new Date('2022/06/21');
  
  const userTrips = tripsArray.filter(trip => trip.userID === travelerId && new Date(trip.date) < today);

  if (userTrips.length === 0 || destinationsArray.length === 0) {
    return { pastTripsDestinations: [], recentDestination: undefined };
  }

  const mostRecentTrip = userTrips.reduce((latest, trip) => {
    return new Date(trip.date) > new Date(latest.date) ? trip : latest;
  }, userTrips[0]);

  const recentDestination = destinationsArray.find(destination => destination.id === mostRecentTrip.destinationID);

  const pastTripsDestinations = userTrips.map(trip => {
    const destination = destinationsArray.find(destination => destination.id === trip.destinationID);
    return destination ? { destination: destination.destination, date: trip.date } : '';
  }).filter(trip => trip.destination !== '');

  return { pastTripsDestinations, recentDestination };
};

const calculateAnnualSpend = (travelerId, tripsArray = allTripData, destinationsArray = allDestinationData) => {
  const today = new Date('2022/06/21');
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const userTrips = tripsArray.filter(trip => trip.userID === travelerId && new Date(trip.date) >= oneYearAgo && new Date(trip.date) <= today);

  const totalCost = userTrips.reduce((total, trip) => {
    const destination = destinationsArray.find(destination => destination.id === trip.destinationID);
    if (destination) {
      const lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers;
      const flightsCost = destination.estimatedFlightCostPerPerson * trip.travelers;
      total += lodgingCost + flightsCost;
    }
    return total;
  }, 0);

  return totalCost;
};

const calculateTotalWithAgentFee = (totalCost) => {
  const agentFee = totalCost * 0.1;
  const totalWithFee = totalCost + agentFee;
  return { totalCost, agentFee, totalWithFee };
};

const getUpcomingTrips = (travelerId, tripsArray = allTripData, destinationsArray = allDestinationData, returnFormat = 'objects') => {
  const startDate = new Date('2022/06/21');
  const endDate = new Date('2023/01/01');

  const userTrips = tripsArray.filter(trip => trip.userID === travelerId && new Date(trip.date) >= startDate && new Date(trip.date) <= endDate);

  if (userTrips.length === 0) {
    return [];
  }

  const upcomingTrips = userTrips.map(trip => {
    const destination = destinationsArray.find(destination => destination.id === trip.destinationID);
    return destination ? { destination: destination.destination, date: trip.date, image: destination.image } : null;
  }).filter(trip => trip !== null);

  if (returnFormat === 'destinations') {
    return upcomingTrips.map(trip => trip.destination);
  }

  return upcomingTrips;
};

export { travelerPastTrips, calculateAnnualSpend, calculateTotalWithAgentFee, getUpcomingTrips };
