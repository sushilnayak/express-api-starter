import { Router } from "express";
import { check, validationResult } from "express-validator";
import HttpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/user";

const router = Router();

router.post("/login", [
  check("email", "email is required").isEmail(),
  check("password", "password is required").not().isEmpty()
], async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await  bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw   err;
      res.json({ token });
    });

  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Server Error");
  }


});

router.post("/signup", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "e-mail is required").isEmail(),
  check("password", "password with min length of 6 is required").isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      res.status(HttpStatus.OK).json({ token });
    });

  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Server Error");

  }

});


export default router;
