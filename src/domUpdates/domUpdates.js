const displayPastTrips = (pastTripsDestinations, recentDestination) => {
  const pastTripsElement = document.querySelector('.content-right-top .content-text p');
  const pastTripImageElement = document.querySelector('.content-right-top .content-img');
  const destinationOverlayElement = document.querySelector('.content-right-top .destination-overlay');
  
  let formattedDestinations;
  
  if (pastTripsDestinations.length === 1) {
    formattedDestinations = `${pastTripsDestinations[0].destination} on ${pastTripsDestinations[0].date}`;
  } else if (pastTripsDestinations.length === 2) {
    formattedDestinations = `${pastTripsDestinations[0].destination} on ${pastTripsDestinations[0].date} and ${pastTripsDestinations[1].destination} on ${pastTripsDestinations[1].date}`;
  } else {
    formattedDestinations = pastTripsDestinations.slice(0, -1).map(trip => `${trip.destination} on ${trip.date}`).join(', ') + ', and ' + `${pastTripsDestinations.slice(-1)[0].destination} on ${pastTripsDestinations.slice(-1)[0].date}`;
  }
  
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
    const sortedTrips = upcomingTrips.sort((a, b) => new Date(a.date) - new Date(b.date));
    const formattedTrips = sortedTrips.map(trip => `${trip.destination} on ${trip.date}`);
    
    let tripText = '';
    if (formattedTrips.length === 1) {
      tripText = formattedTrips[0];
    } else if (formattedTrips.length === 2) {
      tripText = formattedTrips.join(' and ');
    } else {
      tripText = formattedTrips.slice(0, -1).join(', ') + ', and ' + formattedTrips.slice(-1);
    }
    
    upcomingTripsElement.innerText = tripText;
    upcomingTripImageElement.style.backgroundImage = `url('${sortedTrips[0].image}')`;
    upcomingDestinationOverlayElement.innerText = sortedTrips[0].destination;
    upcomingTripImageElement.style.display = 'block';
  }
};

export { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips };
