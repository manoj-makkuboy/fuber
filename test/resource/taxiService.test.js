const TaxiService = require("../../src/resource/TaxiService")

test('Should return nearest available car', () => {
    let car1 = {currentLocation: {latitude: 25, longitude: 26}, colour: "pink", averageKilometerPerHour: 15, isAvailable: true};
    let car2 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: true};
    let car3 = {currentLocation: {latitude: 30, longitude: 31}, colour: "blue", averageKilometerPerHour: 15, isAvailable: false};

    
    let fuber = new TaxiService([car1, car2, car3]);
    fuber._distanceBetweenPoints = jest.fn();

    fuber._distanceBetweenPoints
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(5)

    let customerLocation = {latitude: 29, longitude: 29}
    let nearestCar = fuber.getNearestAvailableCar(customerLocation)

    expect(fuber._distanceBetweenPoints.mock.calls.length).toBe(2);
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

    expect(fuber._distanceBetweenPoints([1,1], [2,2])).toBe(1);
});



