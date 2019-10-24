class TaxiService {
    constructor(args) {
        this.cars = args;
    }

    getAllCars() {
        return this.cars
    }

}

module.exports = TaxiService