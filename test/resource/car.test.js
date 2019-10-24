const Car = require("../../src/resource/Car");

test('Should create new car instance', () => {
  let car1 = new Car({currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15});
  expect(car1.currentLocation.latitude).toBe(50);
  expect(car1.currentLocation.longitude).toBe(60);
  expect(car1.colour).toBe("pink");
  expect(car1.averageKilometerPerHour).toBe(15);

});