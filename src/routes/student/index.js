import { Router } from "express";
import auth from "../../middleware/auth";
import HttpStatus from "http-status-codes";

const router = Router();

router.get("/", auth, (req, res) => {
  res.status(HttpStatus.OK).send("Success");
});

export default router;
