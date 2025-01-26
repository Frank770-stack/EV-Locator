import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  suggestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["approved", "pending"], default: "pending" },
});

const Station = mongoose.model("Station", stationSchema);

export default Station;
