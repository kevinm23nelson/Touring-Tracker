import { expect } from 'chai';
import { validateCredentials, extractTravelerId } from '../../src/logic functions/loginLogicFunctions';
import { loginTestData } from '../Test Datasets/loginLogicFunctions-dataset';

describe('loginFunctions', () => {
    describe('validateCredentials', () => {
        let validCredentials;
        let invalidCredentials;

        beforeEach(() => {
            validCredentials = loginTestData.validCredentials;
            invalidCredentials = loginTestData.invalidCredentials;
        });

        it('should return true for valid traveler credentials', () => {
            expect(validateCredentials(validCredentials.username, validCredentials.password)).to.be.true;
        });

        it('should return false for invalid traveler credentials', () => {
            expect(validateCredentials(invalidCredentials.username, invalidCredentials.password)).to.be.false;
        });

        it('should return false for correct username and incorrect password', () => {
            expect(validateCredentials(validCredentials.username, invalidCredentials.password)).to.be.false;
        });
    });

    describe('extractTravelerId', () => {
        let travelerUsernames;
        let travelerIds;

        beforeEach(() => {
            travelerUsernames = loginTestData.travelerUsernames;
            travelerIds = loginTestData.travelerIds;
        });

        it('should return the traveler ID from the username', () => {
            travelerUsernames.forEach((username, index) => {
                const expectedId = travelerIds[index];
                expect(extractTravelerId(username)).to.equal(expectedId);
            });
        });
    });
});


