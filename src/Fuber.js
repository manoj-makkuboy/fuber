let TaxiService = require("../src/resource/TaxiService")
let Car = require("../src/resource/Car")

let car1 = new Car({id:1, currentLocation: { latitude: 25, longitude: 26 }, colour: "pink", averageKilometerPerHour: 15, isAvailable: false });
let car2 = new Car({id:2, currentLocation: { latitude: 30, longitude: 31 }, colour: "blue", averageKilometerPerHour: 15, isAvailable: true });
let car3 = new Car({id:3, currentLocation: { latitude: 30, longitude: 31 }, colour: "pink", averageKilometerPerHour: 15, isAvailable: true });
let car4 = new Car({id:4, currentLocation: { latitude: 25, longitude: 25 }, colour: "pink", averageKilometerPerHour: 15, isAvailable: true });

let Fuber = new TaxiService([car1, car2, car3, car4])

module.exports = Fuber