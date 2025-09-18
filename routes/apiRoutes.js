const express = require('express');
const router = express.Router();
const apiDefinition = require("../models/ApiDefinition");

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiDefinition:
 *       type: object
 *       required:
 *         - name
 *         - method
 *         - endpoint
 *       properties:
 *         name:
 *           type: string
 *           description: API name
 *         method:
 *           type: string
 *           description: HTTP method (GET, POST, PUT, DELETE)
 *         endpoint:
 *           type: string
 *           description: API endpoint (e.g. /users)
 *         requestBody:
 *           type: object
 *           description: Example request body
 *         responseBody:
 *           type: object
 *           description: Example response body
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new API definition
 *     tags: [API Generator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiDefinition'
 *     responses:
 *       200:
 *         description: API created successfully
 */
router.post("/create", async (req, res) => {
  try {
    const api = new apiDefinition(req.body);
    await api.save();
    res.json({ message: "API created successfully", api });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Get all API definitions
 *     tags: [API Generator]
 *     responses:
 *       200:
 *         description: List of APIs
 */
router.get("/list", async (req, res) => {
  try {
    const apis = await apiDefinition.find();
    res.json(apis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /test/{id}:
 *   post:
 *     summary: Test an API by ID
 *     tags: [API Generator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: API ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Simulated API response
 */
router.post("/test/:id", async (req, res) => {
  try {
    const api = await apiDefinition.findById(req.params.id);
    if (!api) return res.status(404).json({ error: "API not found" });

    res.json({
      endpoint: api.endpoint,
      method: api.method,
      requestSent: req.body || {},
      response: api.responseBody || { message: "Success" }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /export:
 *   get:
 *     summary: Export all APIs as JSON file
 *     tags: [API Generator]
 *     responses:
 *       200:
 *         description: JSON file with API definitions
 */
router.get("/export", async (req, res) => {
  try {
    const apis = await apiDefinition.find();
    res.setHeader("Content-Disposition", "attachment; filename=apis.json");
    res.json(apis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
