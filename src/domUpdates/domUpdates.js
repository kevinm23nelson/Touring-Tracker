import { allDestinationData } from '../startData';

const displayPastTrips = (pastTripsDestinations, recentDestination) => {
  const pastTripsElement = document.querySelector('.content-right-top .content-text p');
  const pastTripImageElement = document.querySelector('.content-right-top .content-img');
  const destinationOverlayElement = document.querySelector('.content-right-top .destination-overlay');

  const formattedDestinations = pastTripsDestinations.map(trip => `${trip.destination} on ${trip.date}`).join(', ');

  pastTripsElement.innerText = formattedDestinations;
  pastTripImageElement.style.backgroundImage = `url('${recentDestination.image}')`;
  destinationOverlayElement.innerText = recentDestination.destination;
};

const displayRecentTripImage = (recentTrip) => {
  const recentTripImageElement = document.querySelector('.content-right-top .content-img');
  recentTripImageElement.style.backgroundImage = `url('${recentTrip.image}')`;
};

const displayTotalCost = (totalCost, agentFee, totalWithFee) => {
  const totalCostElement = document.querySelector('.content-right-bottom .content-text p');
  totalCostElement.innerText = `Total Cost: $${totalCost}\nAgent Fee: $${agentFee}\nTotal with Fee: $${totalWithFee}`;
};

const displayUpcomingTrips = (upcomingTrips) => {
  const upcomingTripsElement = document.querySelector('.content-left-bottom .text');
  const upcomingTripImageElement = document.querySelector('.content-left-bottom .trip-image');
  const upcomingDestinationOverlayElement = document.querySelector('.content-left-bottom .destination-overlay');

  if (upcomingTrips.length === 0) {
    upcomingTripsElement.innerText = "You have no upcoming trips";
    upcomingTripImageElement.style.display = 'none';
  } else {
    const formattedTrips = upcomingTrips.map(trip => `${trip.destination} on ${trip.date}`).join(', ');
    const nextUpcomingTrip = upcomingTrips[0];

    upcomingTripsElement.innerText = formattedTrips;
    upcomingTripImageElement.style.backgroundImage = `url('${nextUpcomingTrip.image}')`;
    upcomingDestinationOverlayElement.innerText = nextUpcomingTrip.destination;
    upcomingTripImageElement.style.display = 'block';
  }
};

const displayPendingTrips = (pendingTrips) => {
  const pendingTripsElement = document.querySelector('.content-right-middle .text');
  const pendingTripsImageElement = document.querySelector('.content-right-middle .content-img');
  const pendingDestinationOverlayElement = document.querySelector('.content-right-middle .destination-overlay');
  const defaultImageUrl = '../images/Travel Photo - City on Rocky Coast.jpg';

  if (pendingTrips.length === 0) {
    pendingTripsElement.innerText = "You have no pending trips";
    pendingTripsImageElement.style.backgroundImage = `url('${defaultImageUrl}')`;
  } else {
    const formattedTrips = pendingTrips.map(trip => {
      const destination = allDestinationData.find(dest => dest.id === trip.destinationID);
      return `${destination.destination}, for ${trip.duration} days, ${trip.travelers} traveler(s), on ${trip.date}`;
    }).join(', ');

    pendingTripsElement.innerText = formattedTrips;
    const latestPendingTrip = pendingTrips[pendingTrips.length - 1];
    const destination = allDestinationData.find(dest => dest.id === latestPendingTrip.destinationID);

    pendingTripsImageElement.style.backgroundImage = `url('${destination.image}')`;
    pendingDestinationOverlayElement.innerText = destination.destination;
    pendingTripsImageElement.style.display = 'block';
  }
};

export { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips, displayPendingTrips };
