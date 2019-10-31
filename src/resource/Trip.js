let Utils = require("../util/utils")
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

    getTripDurationInMinutes(){
        const diffInMinutes = parseInt((this.dropTime - this.pickupTime) / (1000 * 60), 10); 
        return diffInMinutes; 
    }

    getTripDistanceInKilometers() {
        let distanceBetweenCurrentCarLocationAndPickupLocation = Utils.distanceBetweenPoints([this.car.currentLocation.latitude, this.car.currentLocation.longitude], [this.pickupLocation.latitude, this.pickupLocation.longitude]);
        let distanceBetweenDropLocationAndPickupLocation = Utils.distanceBetweenPoints([this.pickupLocation.latitude, this.pickupLocation.longitude], [this.dropLocation.latitude, this.dropLocation.longitude]);
        return distanceBetweenCurrentCarLocationAndPickupLocation + distanceBetweenDropLocationAndPickupLocation
    }

}

module.exports = Trip