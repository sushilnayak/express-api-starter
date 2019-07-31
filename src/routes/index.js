import { Router } from "express";
import HttpStatus from "http-status-codes";
import swaggerSpec from "../swagger";
import authRoute from "./auth";
import studentRoute from "./student";

const router = Router();

router.get("/swagger.json", (req, res) => res.json(swaggerSpec));

router.get("/", (req, res) => res.json({
  app: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
  logLevel: process.env.APP_LOG_LEVEL
}).status(HttpStatus.OK));

router.use("/student", studentRoute);

router.use("/auth", authRoute);

export default router;
