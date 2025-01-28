import express from "express";
import { getNearbyChargingStations } from "../controllers/openChargeMapController.js";

const router = express.Router();

router.get("/stations", getNearbyChargingStations);

export default router;
