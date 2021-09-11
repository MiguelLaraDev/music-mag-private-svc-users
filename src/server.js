import restify from "restify";
import dotenv from "dotenv";
import connectDB from "./mongoose-connection.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

var server = restify.createServer({
  name: "music-mag-private-svc-users",
  version: "0.0.1",
});

// Parse incoming data:
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    mapParams: true,
  })
);

server.listen(process.env.PORT, process.env.domain, function () {
  console.log(server.name + " listening at " + server.url);

  connectDB()
    .then(() => {
      console.log("*** DB CONNECTED ***");
    })
    .catch((error) => {
      console.log(error);
      process.exit(422);
    });
});

userRoutes(server);

process.on("uncaughtException", function (err) {
  console.error("UNCAUGHT EXCEPTION - " + (err.stack || err));
  process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
  console.error(`UNHANDLED PROMISE REJECTION
   reason: ${reason}`);
  process.exit(1);
});
