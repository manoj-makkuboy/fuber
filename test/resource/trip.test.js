const Car = require("../../src/resource/Car");
const Trip = require("../../src/resource/Trip")


beforeEach(() => {
    Trip.noOfTripsCreated = 0;
});

test('Should create new car instance', () => {
    let car1 = new Car({
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        averageKilometerPerHour: 15
    });
    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }
    let trip1 = new Trip(car1, pickupLocation);
    expect(trip1.car).toBe(car1);

});

test('Should Auto Increment ID on create of new trip', () => {
    let car1 = new Car({
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        averageKilometerPerHour: 15
    });
    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    expect(Trip.noOfTripsCreated).toBe(0);

    let trip1 = new Trip(car1, pickupLocation);
    expect(Trip.noOfTripsCreated).toBe(1);
    expect(trip1.id).toBe(1);

    let trip2 = new Trip(car1, pickupLocation);
    expect(Trip.noOfTripsCreated).toBe(2);
    expect(trip2.id).toBe(2);

});


test('Should create pickup time on create of new trip', () => {
    let car1 = new Car({
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        averageKilometerPerHour: 15
    });
    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    const mockDate = new Date(1466424490000)
    let spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate)


    let trip1 = new Trip(car1, pickupLocation);
    expect(Trip.noOfTripsCreated).toBe(1);
    expect(trip1.pickupTime).toBe(new Date());

    let trip2 = new Trip(car1, pickupLocation);
    expect(Trip.noOfTripsCreated).toBe(2);
    expect(trip2.pickupTime).toBe(new Date());

    spy.mockRestore();
});

test('Should set availability of car to false on create of new trip', () => {
    let car1 = new Car({
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        isAvailable: true
    });
    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    expect(car1.isAvailable).toBe(true);
    let trip1 = new Trip(car1, pickupLocation);

    expect(car1.isAvailable).toBe(false);
});

test('Should return the total duration of the trip', () => {
    let car1 = {
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        isAvailable: true
    };
    car1.setAvailable = jest.fn()

    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    const pickUpDateTime = new Date('Thu Oct 31 2019 13:07:00 GMT+0530 (India Standard Time)')

    const dropDateTime = new Date('Thu Oct 31 2019 13:09:00 GMT+0530 (India Standard Time)')

    let trip = new Trip(car1, pickupLocation);
    trip.pickupTime = pickUpDateTime;
    trip.dropTime = dropDateTime;

    let tripDuration = trip.getTripDurationInMinutes();

    expect(tripDuration).toBe(2);

});

test('Should return the total distance of the trip', () => {
    let car1 = {
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        isAvailable: true
    };
    car1.setAvailable = jest.fn()

    let pickupLocation = { latitude: 30, longitude: 40 }

    let trip = new Trip(car1, pickupLocation);

    trip.dropLocation = { latitude: 32, longitude: 42 }

    let tripDistance = trip.getTripDistanceInKilometers();

    expect(tripDistance).toBe(31);

});

test('Should close the trip in the given drop location', () => {
    let car1 = { id: 1, currentLocation: { latitude: 50, longitude: 60 }, colour: "pink", averageKilometerPerHour: 15 };
    car1.setAvailable = jest.fn();

    const dropTimeMock = new Date(1466424490000)
    jest
        .spyOn(global, 'Date')
        .mockImplementation(() => dropTimeMock)

    let pickupLocation = { latitude: 30, longitude: 40 }

    let trip = new Trip(car1, pickupLocation);
    trip.calculateTripCost = jest.fn()

    dropLocation = { latitude: 12, longitude: 10 };

    let closedTrip = trip.closeTrip(dropLocation);

    expect(trip.calculateTripCost).toBeCalled()

    expect(trip.dropLocation).toEqual(dropLocation);
    expect(trip.dropTime).toBe(dropTimeMock);


    expect(closedTrip.dropLocation).toEqual(dropLocation);
    expect(closedTrip.dropTime).toBe(dropTimeMock);

});

test('Should calculate the trip cost when the color price for colour is defined', () => {
    let car1 = {
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "pink",
        isAvailable: true
    };
    car1.setAvailable = jest.fn()

    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    let trip = new Trip(car1, pickupLocation);

    let distanceCovered = 31;
    let tripDuration = 2;

    trip.getTripDistanceInKilometers = jest.fn().mockReturnValueOnce(distanceCovered);
    trip.getTripDurationInMinutes = jest.fn().mockReturnValueOnce(tripDuration); 


    trip.calculateTripCost()
    let totalTripCost = trip.totalCost;

    let dogecoinPerMinute = 1;
    let dogecoinPerKilometer = 2;
    let dogecoinForSelectedCarColour = 5;

    let expectedCost = (tripDuration * dogecoinPerMinute) + (distanceCovered * dogecoinPerKilometer) + dogecoinForSelectedCarColour;

    expect(totalTripCost).toBe(expectedCost);
});


test('Should calculate the trip cost when the color price for colour is no defined', () => {
    let car1 = {
        id: 1,
        currentLocation: { latitude: 50, longitude: 60 },
        colour: "blue",
        isAvailable: true
    };
    car1.setAvailable = jest.fn()

    let pickupLocation = { pickupLocation: { latitude: 30, longitude: 40 } }

    let trip = new Trip(car1, pickupLocation);

    let distanceCovered = 31;
    let tripDuration = 2;

    trip.getTripDistanceInKilometers = jest.fn().mockReturnValueOnce(distanceCovered);
    trip.getTripDurationInMinutes = jest.fn().mockReturnValueOnce(tripDuration); 


    trip.calculateTripCost()
    let totalTripCost = trip.totalCost;

    let dogecoinPerMinute = 1;
    let dogecoinPerKilometer = 2;
    let dogecoinForSelectedCarColour = 0;

    let expectedCost = (tripDuration * dogecoinPerMinute) + (distanceCovered * dogecoinPerKilometer) + dogecoinForSelectedCarColour;

    expect(totalTripCost).toBe(expectedCost);
});