import './css/styles.css';
import './images/turing-logo.png';
import './images/Travel Photo - Beach from Above.jpg';
import './images/Travel Photo - Rocky Beach from Above.jpg';
import './images/Travel Photo - Alt Rocky Beach.jpg';
import './images/Travel Photo - City on Rocky Coast.jpg';
import { fetchAllData, allTripData, allDestinationData, allUsersData, allSingleUserData } from './startData';
import { validateCredentials, extractTravelerId } from './logic functions/loginLogicFunctions';
import { travelerPastTrips, calculateAnnualSpend, calculateTotalWithAgentFee, getUpcomingTrips } from './logic functions/travelerLogicFunctions';
import { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips } from './domUpdates/domUpdates';
import { addNewTrip } from './apiCalls';

// scripts.js
// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  let nextTripId = 204; // Starting point for new trips

  const loginView = document.querySelector('.login-view');
  const dashboard = document.querySelector('.dashboard');
  const loginForm = document.querySelector('.login-form');
  const userGreeting = document.getElementById('user-greeting');
  const todayDateElement = document.getElementById('today-date');
  const destinationSelect = document.getElementById('destination-select');
  const calculateCostButton = document.getElementById('calculate-cost-button');
  const reserveTripButton = document.getElementById('reserve-trip-button');
  const estimatedCostElement = document.getElementById('estimated-cost');
  const dateInput = document.getElementById('date-input');
  const durationInput = document.getElementById('duration-input');
  const travelersInput = document.getElementById('travelers-input');
  const errorMessageElement = document.getElementById('error-message');

  const today = '2022-06-21';
  dateInput.value = today;
  dateInput.min = '2020-01-01';
  dateInput.max = '2025-12-31';

  todayDateElement.innerText = `Today is June 21, 2022!`;

  loginForm.addEventListener('submit', handleLogin);

  // Add event listeners to form inputs
  dateInput.addEventListener('input', validateForm);
  durationInput.addEventListener('input', validateForm);
  travelersInput.addEventListener('input', validateForm);
  destinationSelect.addEventListener('input', validateForm);

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateCredentials(username, password)) {
      const travelerId = extractTravelerId(username);
      fetchAllData(travelerId).then(() => {
        console.log('All Users Data:', allUsersData); // Log all users data
        const user = allUsersData.find(user => user.id === travelerId);
        if (!user) {
          console.error(`User with ID ${travelerId} not found.`);
          return;
        }
        showDashboard(user);

        const { pastTripsDestinations, recentDestination } = travelerPastTrips(travelerId);
        displayPastTrips(pastTripsDestinations, recentDestination);
        displayRecentTripImage(recentDestination);

        const totalCost = calculateAnnualSpend(travelerId);
        const { agentFee, totalWithFee } = calculateTotalWithAgentFee(totalCost);
        displayTotalCost(totalCost, agentFee, totalWithFee);

        const upcomingTrips = getUpcomingTrips(travelerId);
        displayUpcomingTrips(upcomingTrips);

        populateDestinations();
        updateNextTripId(); // Update the next trip ID
      });
    } else {
      alert('Invalid username or password');
    }
  }

  function showDashboard(travelerData) {
    console.log('Traveler Data:', travelerData); // Log traveler data
    loginView.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userGreeting.innerText = `Welcome, ${travelerData.name}`;
  }

  function populateDestinations() {
    allDestinationData.forEach(destination => {
      const option = document.createElement('option');
      option.value = destination.id;
      option.textContent = destination.destination;
      destinationSelect.appendChild(option);
    });
  }

  function validateForm() {
    let errorMessage = '';
    if (!dateInput.value) {
      errorMessage = 'Please enter a trip start to begin your estimate.';
    } else if (durationInput.value < 3) {
      errorMessage = 'Please enter a duration of at least 3 days.';
    } else if (travelersInput.value < 1) {
      errorMessage = 'Please enter the number of travelers (at least 1).';
    } else if (!destinationSelect.value) {
      errorMessage = 'Please select a destination.';
    }

    errorMessageElement.innerText = errorMessage;
    calculateCostButton.disabled = !!errorMessage;
    reserveTripButton.disabled = !!errorMessage || !estimatedCostElement.innerText;
  }

  function updateNextTripId() {
    const maxId = allTripData.reduce((max, trip) => Math.max(max, trip.id), 0);
    nextTripId = maxId + 1;
    console.log('Next Trip ID:', nextTripId);
  }

  calculateCostButton.addEventListener('click', () => {
    if (calculateCostButton.disabled) {
      validateForm();
    } else {
      const date = dateInput.value;
      const duration = parseInt(durationInput.value);
      const travelers = parseInt(travelersInput.value);
      const destinationId = parseInt(destinationSelect.value);

      const destination = allDestinationData.find(dest => dest.id === destinationId);

      if (destination) {
        const lodgingCost = destination.estimatedLodgingCostPerDay * duration * travelers;
        const flightsCost = destination.estimatedFlightCostPerPerson * travelers;
        const totalCost = lodgingCost + flightsCost;
        const agentFee = totalCost * 0.1;
        const totalWithFee = totalCost + agentFee;

        estimatedCostElement.innerText = `Estimated Cost: $${totalCost.toFixed(2)}\nAgent Fee: $${agentFee.toFixed(2)}\nTotal with Fee: $${totalWithFee.toFixed(2)}`;
        errorMessageElement.innerText = ''; // Clear error message if calculation is successful
        reserveTripButton.disabled = false; // Enable the Reserve Trip button
      } else {
        estimatedCostElement.innerText = 'Please select a valid destination.';
        reserveTripButton.disabled = true;
      }
    }
  });

  reserveTripButton.addEventListener('click', () => {
    const travelerId = extractTravelerId(document.getElementById('username').value);
    const date = dateInput.value.split('-').join('/');
    const duration = parseInt(durationInput.value);
    const travelers = parseInt(travelersInput.value);
    const destinationId = parseInt(destinationSelect.value);

    const newTrip = {
      id: nextTripId++, // Increment the trip ID
      userID: travelerId,
      destinationID: destinationId,
      travelers: travelers,
      date: date,
      duration: duration,
      status: 'pending',
      suggestedActivities: []
    };

    console.log('New trip:', newTrip); // Log the new trip object for debugging

    addNewTrip(newTrip)
      .then(data => {
        console.log('Trip successfully added:', data); // Log the successful addition
        fetchAllData(travelerId).then(() => {
          const pendingTrips = allTripData.filter(trip => trip.userID === travelerId && trip.status === 'pending');
          displayPendingTrips(pendingTrips);
          const upcomingTrips = getUpcomingTrips(travelerId);
          displayUpcomingTrips(upcomingTrips);
        });
      })
      .catch(error => {
        console.error('Error adding new trip:', error);
        updateNextTripId(); // Update the next trip ID in case of an error
      });
  });

  function displayPendingTrips(pendingTrips) {
    const pendingTripsElement = document.querySelector('.content-right-middle .text');
    const pendingTripsImageElement = document.querySelector('.content-right-middle .content-img');
    const pendingDestinationOverlayElement = document.querySelector('.content-right-middle .destination-overlay');

    if (pendingTrips.length === 0) {
      pendingTripsElement.innerText = "You have no pending trips";
      pendingTripsImageElement.style.display = 'none';
    } else {
      const formattedTrips = pendingTrips.map(trip => {
        const destination = allDestinationData.find(dest => dest.id === trip.destinationID);
        return destination ? `${destination.destination}, for ${trip.duration} days, ${trip.travelers} traveler(s), on ${trip.date}` : `Unknown destination, for ${trip.duration} days, ${trip.travelers} traveler(s), on ${trip.date}`;
      });

      let tripText = '';
      if (formattedTrips.length === 1) {
        tripText = formattedTrips[0];
      } else if (formattedTrips.length === 2) {
        tripText = formattedTrips.join(' and ');
      } else {
        tripText = formattedTrips.slice(0, -1).join(', ') + ', and ' + formattedTrips.slice(-1);
      }

      pendingTripsElement.innerText = tripText;
      const latestPendingTrip = pendingTrips[pendingTrips.length - 1];
      const destination = allDestinationData.find(dest => dest.id === latestPendingTrip.destinationID);
      if (destination) {
        pendingTripsImageElement.style.backgroundImage = `url('${destination.image}')`;
        pendingDestinationOverlayElement.innerText = destination.destination;
        pendingTripsImageElement.style.display = 'block';
      }
    }
  }

  function displayUpcomingTrips(upcomingTrips) {
    const upcomingTripsElement = document.querySelector('.content-left-bottom .text');
    const upcomingTripImageElement = document.querySelector('.content-left-bottom .trip-image');
    const upcomingDestinationOverlayElement = document.querySelector('.content-left-bottom .destination-overlay');

    if (upcomingTrips.length === 0) {
      upcomingTripsElement.innerText = "You have no upcoming trips";
      upcomingTripImageElement.style.display = 'none';
    } else {
      const sortedTrips = upcomingTrips.sort((a, b) => new Date(a.date) - new Date(b.date));
      const formattedTrips = sortedTrips.map(trip => {
        const destination = allDestinationData.find(dest => dest.id === trip.destinationID);
        return destination ? `${destination.destination} on ${trip.date}` : `Unknown destination on ${trip.date}`;
      });

      let tripText = '';
      if (formattedTrips.length === 1) {
        tripText = formattedTrips[0];
      } else if (formattedTrips.length === 2) {
        tripText = formattedTrips.join(' and ');
      } else {
        tripText = formattedTrips.slice(0, -1).join(', ') + ', and ' + formattedTrips.slice(-1);
      }

      upcomingTripsElement.innerText = tripText;
      const nextUpcomingTrip = sortedTrips[0];
      const destination = allDestinationData.find(dest => dest.id === nextUpcomingTrip.destinationID);
      if (destination) {
        upcomingTripImageElement.style.backgroundImage = `url('${destination.image}')`;
        upcomingDestinationOverlayElement.innerText = destination.destination;
        upcomingTripImageElement.style.display = 'block';
      } else {
        upcomingTripsElement.innerText = "You have no upcoming trips";
        upcomingTripImageElement.style.display = 'none';
      }
    }
  }

  // Initial validation check
  validateForm();
});
