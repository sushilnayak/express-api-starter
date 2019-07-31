import "./env";
import express from "express";
import fs from "fs";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUiDist from "swagger-ui-dist";
import dbSetup from "./config/db";
import routes from "./routes";
import logger, { logStream } from "./config/logger";

const pathToSwaggerUi = swaggerUiDist.absolutePath();

const app = express();
dbSetup();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: logStream }));
app.use(express.json({ extended: false }));


app.use("/api", routes);

const swaggerIndexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`).toString().replace("https://petstore.swagger.io/v2/swagger.json", "/api/swagger.json");
app.get("/api-docs/index.html", (req, res) => res.send(swaggerIndexContent));
app.get("/api-docs", (req, res) => res.redirect("/api-docs/index.html"));
app.use("/api-docs", express.static(pathToSwaggerUi));

app.listen(process.env.APP_PORT, () => logger.info(`Listening on port ${process.env.APP_PORT}...`));

export default app;
