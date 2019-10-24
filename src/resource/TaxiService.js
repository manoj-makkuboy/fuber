class TaxiService {
    constructor(args) {
        this.cars = args;
    }

    getAllCars() {
        return this.cars;
    }

    _getAllAvailableCars() {
        return this.cars.filter((car) => car.isAvailable === true ? true : false);
    }

    getNearestCar(customerLocation, cars = this.cars) {
      let distanceArray = cars.map((car) => this._distanceBetweenPoints([car.currentLocation.latitude, car.currentLocation.logitude], [customerLocation.latitude, customerLocation.logitude]));
      let nearestDistanceIndex = distanceArray.indexOf(Math.max(...distanceArray))

      return cars[nearestDistanceIndex]
    }

    getNearestCarByColour(customerLocation, colour) {
        let carsWithRequiredColors = this.cars.filter((car) => car.colour === colour ? true : false)
        return this.getNearestCar(customerLocation, carsWithRequiredColors) 
    }

    _distanceBetweenPoints(coorindate1, coordinate2){
        let a = coorindate1[0] - coordinate2[0];
        let b = coorindate1[1] - coordinate2[1];

        let distance = Math.sqrt( a*a + b*b );

        return Math.round(distance)
    }

}

module.exports = TaxiService