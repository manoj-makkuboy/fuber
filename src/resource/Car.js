class Car {
    constructor(args) {
        this.currentLocation = args.currentLocation;
        this.colour = args.colour;
        this.averageKilometerPerHour = args.averageKilometerPerHour;
        this.isAvailable = true;
    }

}

module.exports = Car