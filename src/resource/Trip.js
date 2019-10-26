class Trip {
    constructor(car, pickupLocation) {
        this.id = Trip.setAutoIncrementId()
        this.car = car;
        this.pickupLocation = pickupLocation;
        this.pickupTime = new Date();
    }

    static noOfTripsCreated = 0

    static setAutoIncrementId(){
        Trip.noOfTripsCreated = Trip.noOfTripsCreated + 1
        return Trip.noOfTripsCreated
    }

}

module.exports = Trip