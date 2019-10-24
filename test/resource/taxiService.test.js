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
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    let car2 = {currentLocation: {latitude: 30, longitude: 30}, colour: "blue", averageKilometerPerHour: 15};
    let car3 = {currentLocation: {latitude: 40, longitude: 30}, colour: "blue", averageKilometerPerHour: 15};
    let car4 = {currentLocation: {latitude: 90, longitude: 10}, colour: "pink", averageKilometerPerHour: 15};

    let fuber = new TaxiService([car1, car2, car3, car4]);

    let customerLocation = {latitude: 29, longitude: 29}

    expect(fuber.getNearestCar(customerLocation)).toEqual([car2]);
});

test('Should return distance between two points', () => {
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};

    let fuber = new TaxiService([car1]);

    let customerLocation = {latitude: 29, longitude: 29}

    expect(fuber._distanceBetweenPoints([1,1], [2,2])).toBe(1);
});

