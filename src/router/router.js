const Koa = require("koa");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

let Fuber = require("../Fuber")
let Trip = require("../resource/Trip")

// Route to handle GET request
router.get("/car", async (ctx, next) => {
  let { pickupCoordinates, colour } = ctx.request.query
  let preferredColour = colour
  pickupCoordinates = (pickupCoordinates.split(','))
    .map((coordinate) => parseFloat(coordinate))
  pickupCoordinates = { latitude: pickupCoordinates[0], longitude: pickupCoordinates[1] }
  console.log(pickupCoordinates, preferredColour)
  if (preferredColour) {
    console.log("customer prefers colour")
    availableCar = Fuber.getNearestAvailableCarByColour(pickupCoordinates, preferredColour);
  }
  else {
    availableCar = Fuber.getNearestAvailableCar(pickupCoordinates);
  }

  if (!availableCar) {
    ctx.response.status = 204;
  } else {
    ctx.response.body = availableCar
  }

  await next();
});

// Route to handle POST request
router.post("/trip", async (ctx, next) => {
  let requestBody = ctx.request.body;
  let carParticipatingInTrip = Fuber.cars.filter((car) => car.id === requestBody.car.id && car.isAvailable === true);
  console.log(carParticipatingInTrip)
  if (carParticipatingInTrip.length !== 0) {
    let createdTrip = Fuber.createTrip(carParticipatingInTrip[0], requestBody.pickupLocation);
    ctx.response.body = createdTrip;
    ctx.response.status = 201;
  }
  else {
    ctx.response.status = 412;
    ctx.response.body = { message: "no cars available for trip" }
  }

  await next();
});


router.put("/trip/:id", async (ctx, next) => {
  let requestBody = ctx.request.body;
  let tripToUpdate = Fuber.findTripById(parseInt(ctx.params.id));
  if (tripToUpdate === undefined) {
    ctx.response.status = 204;
  }
  else {
    tripToUpdate.closeTrip(requestBody.dropLocation);
    ctx.response.status = 200;
    ctx.response.body = tripToUpdate;
  }

  await next();
});



module.exports = app;
