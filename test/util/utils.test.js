let Utils = require("../../src/util/utils")

test('Should return distance between two points', () => {
    let car1 = {currentLocation: {latitude: 50, longitude: 60}, colour: "pink", averageKilometerPerHour: 15};
    expect(Utils.distanceBetweenPoints([1,1], [2,2])).toBe(1);
});
