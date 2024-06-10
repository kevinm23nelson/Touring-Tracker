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
      fetchAllData().then(() => {
        const user = allUsersData.find(user => user.id === travelerId);
        showDashboard(user);

        travelerPastTrips(travelerId).then(({ pastTripsDestinations, recentDestination }) => {
          displayPastTrips(pastTripsDestinations);
          displayRecentTripImage(recentDestination);
        });

        calculateAnnualSpend(travelerId).then(totalCost => {
          const { agentFee, totalWithFee } = calculateTotalWithAgentFee(totalCost);
          displayTotalCost(totalCost, agentFee, totalWithFee);
        });

        getUpcomingTrips(travelerId).then(upcomingTrips => {
          displayUpcomingTrips(upcomingTrips);
        });
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
