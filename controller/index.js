const express = require("express");
const router = express.Router();

const deptRoutes = require("./deptRouter");
const roleRoutes = require("./roleRouter");
const empRoutes = require("./empRouter");

router.use("/departments", deptRoutes);
router.use("/roles", roleRoutes);
router.use("/employees", empRoutes);


module.exports = router;