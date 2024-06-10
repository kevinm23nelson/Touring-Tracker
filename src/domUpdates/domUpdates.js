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


export { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips };
