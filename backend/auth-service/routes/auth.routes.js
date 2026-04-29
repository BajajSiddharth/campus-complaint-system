const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  console.log("Login request:", email, password);
  const user = await User.findOne({ email, password });
    
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

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


  // res.json({
  //   token,
  //   role: user.role,
  //   userId: user._id,
  //   name: user.name
  // });
});

module.exports = router;
