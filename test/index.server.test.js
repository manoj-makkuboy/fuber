// require the Koa server
const server = require("../src/server");
// require supertest
const request = require("supertest");
// close the server after each test
afterEach(() => {
    server.close();
});
describe("sample test", () => {
    test("should respond as expected", async () => {
        const response = await request(server).get("/helloWorld");
        expect(response.status).toEqual(200);
    });
});
