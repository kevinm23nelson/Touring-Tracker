const displayPastTrips = (pastTripsDestinations) => {
  const pastTripsElement = document.querySelector('.content-right-top .content-text p');
  
  let formattedDestinations;
  
  if (pastTripsDestinations.length === 1) {
    formattedDestinations = pastTripsDestinations[0];
  } else if (pastTripsDestinations.length === 2) {
    formattedDestinations = pastTripsDestinations.join(' and ');
  } else {
    formattedDestinations = pastTripsDestinations.slice(0, -1).join(', ') + ', and ' + pastTripsDestinations.slice(-1);
  }
  
  pastTripsElement.innerText = formattedDestinations;
};

const displayRecentTripImage = (recentTrip) => {
  const recentTripImageElement = document.querySelector('.content-right-top .content-img');
  recentTripImageElement.style.backgroundImage = `url('${recentTrip.image}')`;
};

export { displayPastTrips, displayRecentTripImage };

  