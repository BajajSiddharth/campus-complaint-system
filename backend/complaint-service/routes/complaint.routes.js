const router = require("express").Router();
const Complaint = require("../models/Complaint");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint management APIs
 */


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


/**
 * @swagger
 * /complaints:
 *   get:
 *     summary: Fetch complaints based on user role
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: OPEN
 *       401:
 *         description: Unauthorized
 */


router.get("/", auth, async (req, res) => {
  let query = {};
  if (req.user.role === "STUDENT")
    query.createdBy = req.user.userId;
  if (req.user.role === "MAINTENANCE")
    query.assignedTo = req.user.userId;

  const complaints = await Complaint.find(query);
  res.json(complaints);
});


/**
 * @swagger
 * /complaints/{id}/assign:
 *   put:
 *     summary: Assign complaint to maintenance staff (Admin only)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedTo
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 example: 64fa1abc123
 *     responses:
 *       200:
 *         description: Complaint assigned successfully
 *       403:
 *         description: Forbidden
 */


router.put("/:id/assign", auth, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ message: "Unauthorized" });

  await Complaint.findByIdAndUpdate(req.params.id, {
    assignedTo: req.body.assignedTo,
    status: "IN_PROGRESS"
  });
  res.json({ message: "Assigned successfully" });
});


/**
 * @swagger
 * /complaints/{id}/status:
 *   put:
 *     summary: Update complaint status (Maintenance/Admin)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: RESOLVED
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       403:
 *         description: Forbidden
 */



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
