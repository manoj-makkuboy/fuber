let TaxiService = require("../src/resource/TaxiService")
let Car = require("../src/resource/Car")

let car1 = new Car({id:1, currentLocation: { latitude: 25, longitude: 26 }, colour: "pink" });
let car2 = new Car({id:2, currentLocation: { latitude: 30, longitude: 31 }, colour: "blue" });

let Fuber = new TaxiService([car1, car2])

module.exports = Fuber