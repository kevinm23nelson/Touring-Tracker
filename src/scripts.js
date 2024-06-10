// scripts.js
import './css/styles.css';
import './images/turing-logo.png';
import './images/Travel Photo - Beach from Above.jpg';
import './images/Travel Photo - Rocky Beach from Above.jpg';
import './images/Travel Photo - Alt Rocky Beach.jpg';
import './images/Travel Photo - City on Rocky Coast.jpg';
import { fetchData } from './apiCalls';
import { validateCredentials, extractTravelerId } from './logic functions/loginLogicFunctions';
import { travelerPastTrips } from './logic functions/travelerLogicFunctions';
import { displayPastTrips, displayRecentTripImage } from './domUpdates/domUpdates';

document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.querySelector('.login-view');
  const dashboard = document.querySelector('.dashboard');
  const loginForm = document.querySelector('.login-form');
  const userGreeting = document.getElementById('user-greeting');

  loginForm.addEventListener('submit', handleLogin);

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateCredentials(username, password)) {
      const travelerId = extractTravelerId(username);
      fetchData(`http://localhost:3001/api/v1/travelers/${travelerId}`)
        .then(data => {
          showDashboard(data);
          return travelerPastTrips(travelerId);
        })
        .then(({ pastTripsDestinations, recentDestination }) => {
          displayPastTrips(pastTripsDestinations);
          displayRecentTripImage(recentDestination);
        })
        .catch(error => {
          console.error('Error loading past trips:', error);
        });
    } else {
      alert('Invalid username or password');
    }
  }

  function showDashboard(travelerData) {
    loginView.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userGreeting.innerText = `Welcome, ${travelerData.name}`;
  }
});
