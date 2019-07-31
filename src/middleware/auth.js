import jwt from "jsonwebtoken";

export default function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  }
  catch (ex) {
    res.status(401).send("Invalid token.");
  }
}
