const Koa = require("koa");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

let Fuber = require("../Fuber")

// Route to handle GET request
router.get("/car", async (ctx, next) => {
  let { pickupCoordinates, colour } = ctx.request.query
  let preferredColour = colour
  pickupCoordinates = (pickupCoordinates.split(','))
    .map((coordinate) => parseFloat(coordinate))
  pickupCoordinates = {latitude: pickupCoordinates[0], longitude: pickupCoordinates[1]}
  console.log(pickupCoordinates, preferredColour)
  if(preferredColour){
    console.log("customer prefers colour")
    ctx.response.body = Fuber.getNearestAvailableCarByColour(pickupCoordinates, preferredColour);
  }
  else{
    ctx.response.body = Fuber.getNearestAvailableCar(pickupCoordinates);
  }

  await next();
});

// Route to handle POST request
router.post("/helloWorld", async (ctx, next) => {
  console.log('payload in POST ', ctx.request.body)
  ctx.response.body = 'hello world ';
  await next();
});




module.exports = app;
