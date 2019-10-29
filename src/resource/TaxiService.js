let Trip = require("../resource/Trip")
class TaxiService {
    constructor(args) {
        this.cars = args;
        this.trips = [];
    }

    getNearestAvailableCar(customerLocation, cars = this.cars) {
        let availableCars = cars.filter((car) => car.isAvailable);
        let distanceArray = availableCars.map((car) => this._distanceBetweenPoints([car.currentLocation.latitude, car.currentLocation.longitude], [customerLocation.latitude, customerLocation.longitude]));
        let nearestDistanceIndex = distanceArray.indexOf(Math.min(...distanceArray))

        return availableCars[nearestDistanceIndex]
    }

    getNearestAvailableCarByColour(customerLocation, colour) {
        let carsWithRequiredColors = this.cars.filter((car) => car.colour === colour)
        return this.getNearestAvailableCar(customerLocation, carsWithRequiredColors)
    }

    _distanceBetweenPoints(coorindate1, coordinate2) {
        let a = coorindate1[0] - coordinate2[0];
        let b = coorindate1[1] - coordinate2[1];

        let distance = Math.sqrt(a * a + b * b);

        return Math.round(distance)
    }

    createTrip(car, pickupLocation) {
        this.trips.push(new Trip(car, pickupLocation));
    }

}

module.exports = TaxiService