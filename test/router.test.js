// require the Koa server
const server = require("../src/server");
// require supertest
const request = require("supertest");
// close the server after each test
afterEach(() => {
    server.close();
});
describe("test trip endpoint", () => {

    test("Should return 204 when no cars are available", async () => {
        const response = await request(server)
            .get("/car?pickupCoordinates=20,20");
        expect(response.status).toEqual(200);

        let response1 = await request(server)
            .post("/trip")
            .send({
                "car": {
                    "id": 1,
                    "isAvailable": false
                },
                "pickupLocation": {
                    "latitude": 30,
                    "longitude": 31
                }
            })
            .set('Accept', 'application/json')

        expect(response1.status).toEqual(201);


        let response2 = await request(server)
            .post("/trip")
            .send({
                "car": {
                    "id": 2,
                    "isAvailable": false
                },
                "pickupLocation": {
                    "latitude": 30,
                    "longitude": 31
                }
            })
            .set('Accept', 'application/json')

        expect(response2.status).toEqual(201);

        let response3 = await request(server)
            .get("/car?pickupCoordinates=20,20");
        expect(response3.status).toEqual(204)
    });
    
});
