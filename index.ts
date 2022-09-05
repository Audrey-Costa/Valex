import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

dotenv.config();

const app = express();
app.use(cors(), express.json(), router);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
