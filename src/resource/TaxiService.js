let Trip = require("../resource/Trip")
let Utils = require("../util/utils")
class TaxiService {
    constructor(args) {
        this.cars = args;
        this.trips = [];
    }

    getNearestAvailableCar(customerLocation, cars = this.cars) {
        let availableCars = cars.filter((car) => car.isAvailable);
        let distanceArray = availableCars.map((car) => Utils.distanceBetweenPoints([car.currentLocation.latitude, car.currentLocation.longitude], [customerLocation.latitude, customerLocation.longitude]));
        let nearestDistanceIndex = distanceArray.indexOf(Math.min(...distanceArray))

        return availableCars[nearestDistanceIndex]
    }

    getNearestAvailableCarByColour(customerLocation, colour) {
        let carsWithRequiredColors = this.cars.filter((car) => car.colour === colour)
        return this.getNearestAvailableCar(customerLocation, carsWithRequiredColors)
    }

    createTrip(car, pickupLocation) {
        let trip = new Trip(car, pickupLocation);
        this.trips.push(trip);
        return trip;
    }

    closeTrip = (tripId, dropLocation) => {
        let indexOfTripToClose = this.trips.findIndex((trip) => trip.id === tripId)
        this.trips[indexOfTripToClose].dropLocation = dropLocation;
        this.trips[indexOfTripToClose].dropTime = new Date();
        return this.trips[indexOfTripToClose];
    }

}

module.exports = TaxiService