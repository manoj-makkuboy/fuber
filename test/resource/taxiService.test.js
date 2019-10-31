const TaxiService = require("../../src/resource/TaxiService")

test('Should return nearest available car', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15, isAvailable: true};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: true};
    let car3 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: false};

    
    let fuber = new TaxiService([car1, car2, car3]);
    fuber.distanceBetweenPoints = jest.fn();

    fuber.distanceBetweenPoints
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(5)

    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestAvailableCar(customerLocation)

    expect(fuber.distanceBetweenPoints.mock.calls.length).toBe(2);
    expect(nearestCar).toEqual(car1);
});

test('Should return nearest available car by Chosen Colour', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15, isAvailable:true};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: true};
    let car3 = {currentLocation: {latitude: 30, longitude: 31}, colour: "pink", averageKilometerPerHour: 15, isAvailable: true};
    let car4 = {currentLocation: {latitude: 30, longitude: 31}, colour: "pink", averageKilometerPerHour: 15, isAvailable: false};

    
    let fuber = new TaxiService([car1, car2, car3, car4]);
    fuber.getNearestAvailableCar = jest.fn();


    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestAvailableCarByColour(customerLocation, "pink")

    expect(fuber.getNearestAvailableCar.mock.calls[0][1]).toEqual([car1, car3, car4]);
});

test('Should return distance between two points', () => {
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};

    let fuber = new TaxiService([car1]);

    expect(fuber.distanceBetweenPoints([1,1], [2,2])).toBe(1);
});

test('Should create a new trip with car and pickup location', () => {
    let car1 = {id: 1, currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    car1.setAvailable = jest.fn();
    let pickupLocationForCar1 = {
        "latitude": 30,
        "longitude": 31
    }

    let car2 = {id: 2, currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    car2.setAvailable = jest.fn();
    let pickupLocationForCar2 = {
        "latitude": 60,
        "longitude": 66
    }

    let fuber = new TaxiService([car1]);

    fuber.createTrip(car1, pickupLocationForCar1);

    expect(fuber.trips[0].car.id).toEqual(car1.id)
    expect(fuber.trips[0].pickupLocation).toEqual(pickupLocationForCar1)

    fuber.createTrip(car2, pickupLocationForCar2);

    expect(fuber.trips[1].car.id).toEqual(car2.id)
    expect(fuber.trips[1].pickupLocation).toEqual(pickupLocationForCar2)

});

test('Should close the trip in the given drop location', () => {
    let car1 = {id: 1, currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    car1.setAvailable = jest.fn();

    const dropTimeMock = new Date(1466424490000)
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => dropTimeMock)

    let fuber = new TaxiService([car1]);

    fuber.trips = [{id: 4, dropLocation: null, dropTime: null}];
    dropLocation = {latitude: 12, longitude: 10};

    let closedTrip = fuber.closeTrip(fuber.trips[0].id, dropLocation);

    expect(fuber.trips[0].dropLocation).toEqual(dropLocation);    
    expect(fuber.trips[0].dropTime).toBe(dropTimeMock);

    expect(closedTrip.id).toBe(4);

});



