import './css/styles.css';
import './images/turing-logo.png';
import './images/Travel Photo - Beach from Above.jpg';
import './images/Travel Photo - Rocky Beach from Above.jpg';
import './images/Travel Photo - Alt Rocky Beach.jpg';
import './images/Travel Photo - City on Rocky Coast.jpg';
import { fetchAllData, allTripData, allDestinationData, allUsersData, allSingleUserData } from './startData';
import { validateCredentials, extractTravelerId } from './logic functions/loginLogicFunctions';
import { travelerPastTrips, calculateAnnualSpend, calculateTotalWithAgentFee, getUpcomingTrips } from './logic functions/travelerLogicFunctions';
import { displayPastTrips, displayRecentTripImage, displayTotalCost, displayUpcomingTrips, displayPendingTrips } from './domUpdates/domUpdates';
import { addNewTrip } from './apiCalls';

document.addEventListener('DOMContentLoaded', () => {
  let nextTripId = 204;

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


  window.addEventListener('load', () => {
    loginView.classList.add('fade-in');
  });

  loginForm.addEventListener('submit', handleLogin);


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

        const pendingTrips = allTripData.filter(trip => trip.userID === travelerId && trip.status === 'pending');
        displayPendingTrips(pendingTrips);

        populateDestinations();
        updateNextTripId(); 
      });
    } else {
      alert('Invalid username or password');
    }
  }

  function showDashboard(travelerData) {
    loginView.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    const contentLeft = document.querySelector('.content-left');
    const contentRight = document.querySelector('.content-right');
    

    contentLeft.classList.add('fade-in-left');
    contentRight.classList.add('fade-in-right');

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
        errorMessageElement.innerText = ''; 
        reserveTripButton.disabled = false; 
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
      id: nextTripId++, 
      userID: travelerId,
      destinationID: destinationId,
      travelers: travelers,
      date: date,
      duration: duration,
      status: 'pending',
      suggestedActivities: []
    };

   

    addNewTrip(newTrip)
      .then(data => {
        fetchAllData(travelerId).then(() => {
          const pendingTrips = allTripData.filter(trip => trip.userID === travelerId && trip.status === 'pending');
          displayPendingTrips(pendingTrips);
          const upcomingTrips = getUpcomingTrips(travelerId);
          displayUpcomingTrips(upcomingTrips);
          resetForm(); 
        });
      })
      .catch(error => {
        console.error('Error adding new trip:', error);
        updateNextTripId(); 
      });
  });

  function resetForm() {
    dateInput.value = '2022-06-21'; 
    durationInput.value = '';
    travelersInput.value = '';
    destinationSelect.value = '';
    estimatedCostElement.innerText = '';
    errorMessageElement.innerText = '';
    reserveTripButton.disabled = true;
    validateForm(); 
  }
  validateForm();
});
