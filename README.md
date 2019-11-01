# Fuber - taxi service
    Object Oriented modeling practise

## Getting Started

1. clone the repo
2. In project root directory run the following
   > npm install    
   > npm test
3. > node src/server.js
4. You can find the server running on 3000 port of localhost

## Assumptions

The system starts the trip as soon as the car is allocated. Viz 

* Duration between car assigned and drop is the total trip time
* Distance from car's current location to the pickup location + pickup location to drop location is the total distance of trip

## Usage

* [Api Docs] (https://documenter.getpostman.com/view/5091373/SW11YJrX?version=latest)

use 
> GET /car?pickupCoordinates=20,20 

to get the nearest car

use 
> POST /trip

to create a trip with the car ID got from the GET /car

use 
> PUT /trip 

to close the trip


### Prerequisites

* node - v12.6.0
* npm

## Built With

* [Koajs](https://koajs.com) - The web framework used
* [npm](https://npmjs.com) - Dependency Management
* [jest](https://jestjs.io/) - Test Framework



## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Manoj Mohan** - *Initial work* - [manoj-makkuboy](https://github.com/manoj-makkuboy)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
