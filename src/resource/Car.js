class Car {
    constructor(args) {
        this.id = args.id;
        this.currentLocation = args.currentLocation;
        this.colour = args.colour;
        this.isAvailable = true;
    }

    setAvailable = (isAvailable) => {
        this.isAvailable = isAvailable;
    }

}

module.exports = Car