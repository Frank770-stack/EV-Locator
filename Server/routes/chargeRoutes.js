import express from "express";
// import { getNearestChargingStations } from "../controllers/chargingStationController.js";
import { getNearestChargingStation } from "../controllers/chargingStationController.js";

const router = express.Router();

router.get("/stations", getNearestChargingStation);

export default router;
