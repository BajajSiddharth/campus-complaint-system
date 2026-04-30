const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and generate JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@campus.edu
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: ADMIN
 *       401:
 *         description: Invalid credentials
 */


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("==== LOGIN DEBUG ====");
  console.log("Email received:", email);
  console.log("Password received:", password);

  const user = await User.findOne({ email, password });

  console.log("User found:", user);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "SECRET_KEY"
  );

  return res.status(200).json({
    token,
    role: user.role,
    userId: user._id,
    name: user.name
  });
});
module.exports = router;
