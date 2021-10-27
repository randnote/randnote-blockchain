import express, { Application, Request, Response, NextFunction } from "express";
const level = require("level");
import Blockchain from "./blockchain";
import Transaction from "./transaction";

const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];
app.use(
	cors({
		origin: function (origin: any, callback: any) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
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

require("./database/index");
require("./routes/index")(app);
app.listen(8033, () => console.log(`server started on port 8033`));
