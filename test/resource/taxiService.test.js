const TaxiService = require("../../src/resource/TaxiService")

test('Should init taxiService', () => {
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    let car2 = {currentLocation: {latitude: 30, longitude: 40}, colour: "blue", averageKilometerPerHour: 15};
    let car3 = {currentLocation: {latitude: 40, longitude: 30}, colour: "blue", averageKilometerPerHour: 15};
    let car4 = {currentLocation: {latitude: 90, longitude: 10}, colour: "pink", averageKilometerPerHour: 15};

    let fuber = new TaxiService([car1, car2, car3, car4]);

    expect(fuber.getAllCars()).toEqual([car1, car2, car3, car4]);
});

test('Should return nearest car', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15};
    
    let fuber = new TaxiService([car1, car2]);
    fuber._distanceBetweenPoints = jest.fn();

    fuber._distanceBetweenPoints
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(5)

    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestCar(customerLocation)

    expect(fuber._distanceBetweenPoints.mock.calls.length).toBe(2);
    expect(nearestCar).toEqual(car2);
});

test('Should return nearest car by Chosen Colour', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15};
    let car3 = {currentLocation: {latitude: 30, longitude: 31}, colour: "pink", averageKilometerPerHour: 15};
    
    let fuber = new TaxiService([car1, car2, car3]);
    fuber.getNearestCar = jest.fn();


    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestCarByColour(customerLocation, "pink")

    expect(fuber.getNearestCar.mock.calls[0][1]).toEqual([car1, car3]);
});

test('Should return distance between two points', () => {
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};

    let fuber = new TaxiService([car1]);

    expect(fuber._distanceBetweenPoints([1,1], [2,2])).toBe(1);
});

