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
    
    const dropDateTime = new Date('Thu Oct 31 2019 13:08:00 GMT+0530 (India Standard Time)')

    let trip = new Trip(car1, pickupLocation);
    trip.pickupTime = pickUpDateTime;
    trip.dropTime = dropDateTime;

    let tripDuration = trip.getTripDurationInMinutes();

    expect(tripDuration).toBe(1);

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

    trip.dropLocation = {latitude: 32, longitude: 42}

    let tripDistance = trip.getTripDistanceInKilometers();

    expect(tripDistance).toBe(31);

});