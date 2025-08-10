import mongoose from "mongoose";

const statsHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stats: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});

const STATSHISTORY = mongoose.model("StatsHistory", statsHistorySchema);

export default STATSHISTORY;
