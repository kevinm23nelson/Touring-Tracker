// domUpdates.js

const displayPastTrips = (pastTripsDestinations) => {
  const pastTripsElement = document.querySelector('.content-right-top .content-text p');
  
  let formattedDestinations;
  
  if (pastTripsDestinations.length === 1) {
    formattedDestinations = `${pastTripsDestinations[0].destination} on ${pastTripsDestinations[0].date}`;
  } else if (pastTripsDestinations.length === 2) {
    formattedDestinations = `${pastTripsDestinations[0].destination} on ${pastTripsDestinations[0].date} and ${pastTripsDestinations[1].destination} on ${pastTripsDestinations[1].date}`;
  } else {
    formattedDestinations = pastTripsDestinations.slice(0, -1).map(trip => `${trip.destination} on ${trip.date}`).join(', ') + ', and ' + `${pastTripsDestinations.slice(-1)[0].destination} on ${pastTripsDestinations.slice(-1)[0].date}`;
  }
  
  pastTripsElement.innerText = formattedDestinations;
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
  
  let formattedDestinations;
  
  if (upcomingTrips.length === 1) {
    formattedDestinations = upcomingTrips[0];
  } else if (upcomingTrips.length === 2) {
    formattedDestinations = upcomingTrips.join(' and ');
  } else {
    formattedDestinations = upcomingTrips.slice(0, -1).join(', ') + ', and ' + upcomingTrips.slice(-1);
  }
  
  upcomingTripsElement.innerText = formattedDestinations;
};

export { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips };
