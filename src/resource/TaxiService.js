class TaxiService {
    constructor(args) {
        this.cars = args;
    }

    getAllCars() {
        return this.cars
    }

    _distanceBetweenPoints(coorindate1, coordinate2){
        let a = coorindate1[0] - coordinate2[0];
        let b = coorindate1[1] - coordinate2[1];

        let distance = Math.sqrt( a*a + b*b );

        return Math.round(distance)
    }

}

module.exports = TaxiService