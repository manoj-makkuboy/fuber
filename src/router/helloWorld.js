const Koa = require("koa");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(bodyParser());
app.use(router.routes()); // route middleware
// a simple car object that we can serve


// Route to handle GET request
router.get("/helloWorld", async (ctx, next) => {
  ctx.response.body = 'hello world';
  await next();
});

// Route to handle POST request
router.post("/helloWorld", async (ctx, next) => {
  console.log('payload in POST ', ctx.request.body)
  ctx.response.body = 'hello world ';
  await next();
});




module.exports = app;
