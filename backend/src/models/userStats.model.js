import mongoose from "mongoose"

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stats: { type: Object, required: true },
});

const STATS = mongoose.model("userStats",userStatsSchema)

export default STATS