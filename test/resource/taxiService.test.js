const TaxiService = require("../../src/resource/TaxiService")
let Utils = require("../../src/util/utils")

test('Should return nearest available car', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15, isAvailable: true};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: true};
    let car3 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: false};

    
    let fuber = new TaxiService([car1, car2, car3]);
    Utils.distanceBetweenPoints = jest.fn();

    Utils.distanceBetweenPoints
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(5)

    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestAvailableCar(customerLocation)

    expect(Utils.distanceBetweenPoints.mock.calls.length).toBe(2);
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






