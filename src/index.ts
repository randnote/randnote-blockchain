import express, { Application, Request, Response, NextFunction } from "express";
const level = require("level");
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
app.use(express.urlencoded());
app.use(express.json());

// set environmental variables
let BLOCKCHAIN_API: string = "";
let FRONTEND_API: string = "";
let BACKEND_API: string = "";
if (process.env.NODE_ENV == "development") {
	BLOCKCHAIN_API = "http://localhost:8033";
	FRONTEND_API = "http://localhost:3002";
	BACKEND_API = "http://localhost:8024";
} else if (process.env.NODE_ENV == "production") {
	BLOCKCHAIN_API = "https://blockchain.randnotex.co.za";
	FRONTEND_API = "https://randnotex.co.za";
	BACKEND_API = "https://server.randnotex.co.za";
}

var allowedOrigins = [`${FRONTEND_API}`, `${FRONTEND_API}/admin`];
app.use(
	cors({
		origin: function (origin: any, callback: any) {
			// allow requests with no origin
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				// return callback(new Error(msg), false);
				return callback(null, true); // allow all of em
			}
			return callback(null, true);
		},
	})
);

export { BLOCKCHAIN_API, FRONTEND_API, BACKEND_API };

require("./routes/index")(app);
app.listen(8033, () => console.log(`server started on port 8033`));
