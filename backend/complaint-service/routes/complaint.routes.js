const router = require("express").Router();
const Complaint = require("../models/Complaint");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               priority:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/", auth, async (req, res) => {
  const complaint = await Complaint.create({
    ...req.body,
    createdBy: req.user.userId
  });
  res.json(complaint);
});

router.get("/", auth, async (req, res) => {
  let query = {};
  if (req.user.role === "STUDENT")
    query.createdBy = req.user.userId;
  if (req.user.role === "MAINTENANCE")
    query.assignedTo = req.user.userId;

  const complaints = await Complaint.find(query);
  res.json(complaints);
});

router.put("/:id/assign", auth, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ message: "Unauthorized" });

  await Complaint.findByIdAndUpdate(req.params.id, {
    assignedTo: req.body.assignedTo,
    status: "IN_PROGRESS"
  });
  res.json({ message: "Assigned successfully" });
});

router.put("/:id/status", auth, async (req, res) => {
  if (!["MAINTENANCE", "ADMIN"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await Complaint.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Status updated" });
});
module.exports = router;

``
