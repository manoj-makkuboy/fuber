class Car {
    constructor(args) {
        this.id = args.id;
        this.currentLocation = args.currentLocation;
        this.colour = args.colour;
        this.averageKilometerPerHour = args.averageKilometerPerHour;
        this.isAvailable = true;
    }

    setAvailable(isAvailable){
        this.isAvailable = isAvailable;
    }

}

module.exports = Car