const Car = require("../../src/resource/Car");

test('Should create new car instance', () => {
  let car1 = new Car({currentLocation: {latitude: 50, longitude: 60}, colour: "pink"});
  expect(car1.currentLocation.latitude).toBe(50);
  expect(car1.currentLocation.longitude).toBe(60);
  expect(car1.colour).toBe("pink");
  expect(car1.isAvailable).toBe(true);

});

test('Should set car availability status', () => {
  let car1 = new Car({currentLocation: {latitude: 50, longitude: 60}, colour: "pink", isAvailable: false});
  car1.setAvailable(true);
  expect(car1.isAvailable).toBe(true);
  car1.setAvailable(false);
  expect(car1.isAvailable).toBe(false);

});