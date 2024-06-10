import chai from 'chai';
const expect = chai.expect;

import { travelerPastTrips } from '../../src/logic functions/travelerLogicFunctions';
import tripsData from '../Test Datasets/travelerLogicFunctions-trips-dataset';
import destinationsData from '../Test Datasets/travelerLogicFunctions-destinations-dataset';

describe('travelerPastTrips', () => {
  it('should return past trips and the most recent trip for a given traveler ID', () => {
    const travelerId = 3;

    const result = travelerPastTrips(travelerId, tripsData, destinationsData);

    const expectedPastTripsDestinations = ['Sydney, Austrailia'];
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
    const result = travelerPastTrips(travelerId, tripsData, destinationsData);
    expect(result.pastTripsDestinations).to.deep.equal([]);
    expect(result.recentDestination).to.equal(undefined);
  });

  it('should handle when trips data is not an array', () => {
    const travelerId = 3;
    const tripsDataInvalid = { trips: null };
    try {
      travelerPastTrips(travelerId, tripsDataInvalid, destinationsData);
    } catch (error) {
      expect(error.message).to.equal('Trips data is not an array');
    }
  });

  it('should handle when destinations data is not an array', () => {
    const travelerId = 3;
    const destinationsDataInvalid = { destinations: null };
    try {
      travelerPastTrips(travelerId, tripsData, destinationsDataInvalid);
    } catch (error) {
      expect(error.message).to.equal('Destinations data is not an array');
    }
  });

  it('should handle an empty trips array', () => {
    const travelerId = 3;
    const tripsDataEmpty = { trips: [] };
    const result = travelerPastTrips(travelerId, tripsDataEmpty, destinationsData);
    expect(result.pastTripsDestinations).to.deep.equal([]);
    expect(result.recentDestination).to.equal(undefined);
  });

  it('should handle an empty destinations array', () => {
    const travelerId = 3;
    const destinationsDataEmpty = { destinations: [] };
    const result = travelerPastTrips(travelerId, tripsData, destinationsDataEmpty);
    expect(result.pastTripsDestinations).to.deep.equal([]);
    expect(result.recentDestination).to.equal(undefined);
  });
});
