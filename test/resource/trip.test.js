const Car = require("../../src/resource/Car");
const Trip = require("../../src/resource/Trip")

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