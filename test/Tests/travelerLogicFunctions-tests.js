import chai from 'chai';
const expect = chai.expect;

import { travelerPastTrips, calculateAnnualSpend, calculateTotalWithAgentFee, getUpcomingTrips } from '../../src/logic functions/travelerLogicFunctions';
import { tripsData, destinationsData, travelersData } from '../Test Datasets/testData';

describe('travelerLogicFunctions', () => {
  describe('travelerPastTrips', () => {
    it('should return past trips and the most recent trip for a given traveler ID', () => {
      const travelerId = 3;
      const result = travelerPastTrips(travelerId, tripsData, destinationsData);

      const expectedPastTripsDestinations = [
        { destination: 'Sydney, Austrailia', date: '2022/05/22' },
        { destination: 'Stockholm, Sweden', date: '2021/08/30' },
        { destination: 'Lima, Peru', date: '2021/07/15' }
      ];
      const expectedRecentDestination = {
        id: 22,
        destination: 'Sydney, Austrailia',
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'opera house and city buildings on the water with boats'
      };

      expect(result.pastTripsDestinations).to.deep.equal(expectedPastTripsDestinations);
      expect(result.recentDestination).to.deep.equal(expectedRecentDestination);
    });

    it('should handle a traveler with no trips', () => {
      const travelerId = 1;
      const result = travelerPastTrips(travelerId, [], destinationsData);
      expect(result.pastTripsDestinations).to.deep.equal([]);
      expect(result.recentDestination).to.equal(undefined);
    });

    it('should handle an empty trips array', () => {
      const travelerId = 3;
      const result = travelerPastTrips(travelerId, [], destinationsData);
      expect(result.pastTripsDestinations).to.deep.equal([]);
      expect(result.recentDestination).to.equal(undefined);
    });

    it('should handle an empty destinations array', () => {
      const travelerId = 3;
      const result = travelerPastTrips(travelerId, tripsData, []);
      expect(result.pastTripsDestinations).to.deep.equal([]);
      expect(result.recentDestination).to.equal(undefined);
    });
  });

  describe('calculateAnnualSpend', () => {
    it('should calculate the total spend for the last year', () => {
      const travelerId = 3;
      const result = calculateAnnualSpend(travelerId, tripsData, destinationsData);
      const expectedTotalSpend = 26500; // Update this value based on correct calculation logic
      expect(result).to.equal(expectedTotalSpend);
    });

    it('should return 0 if there are no trips in the last year', () => {
      const travelerId = 1;
      const result = calculateAnnualSpend(travelerId, [], destinationsData);
      expect(result).to.equal(0);
    });
  });

  describe('calculateTotalWithAgentFee', () => {
    it('should calculate the total with agent fee correctly', () => {
      const totalCost = 10000;
      const result = calculateTotalWithAgentFee(totalCost);
      const expectedResult = {
        totalCost: 10000,
        agentFee: 1000,
        totalWithFee: 11000
      };
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('getUpcomingTrips', () => {
    it('should return upcoming trips within the date range', () => {
      const travelerId = 3;
      const result = getUpcomingTrips(travelerId, tripsData, destinationsData);
      const expectedUpcomingTrips = ['Sydney, Austrailia'];
      expect(result).to.deep.equal(expectedUpcomingTrips);
    });

    it('should return an empty array if there are no upcoming trips within the date range', () => {
      const travelerId = 1;
      const result = getUpcomingTrips(travelerId, tripsData, destinationsData);
      expect(result).to.deep.equal([]);
    });
  });
});
