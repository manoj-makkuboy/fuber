class Trip {
    constructor(car, pickupLocation) {
        this.id = Trip.setAutoIncrementId();
        car.setAvailable(false);
        this.car = car;
        this.pickupLocation = pickupLocation;
        this.pickupTime = new Date();
        this.dropLocation = null;
        this.dropTime = null;
    }

    static noOfTripsCreated = 0

    static setAutoIncrementId(){
        Trip.noOfTripsCreated = Trip.noOfTripsCreated + 1
        return Trip.noOfTripsCreated
    }

}

module.exports = Trip