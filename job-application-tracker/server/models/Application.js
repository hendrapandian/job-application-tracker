const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      default: "",
      trim: true
    },
    salary: {
      type: String,
      default: "",
      trim: true
    },
    status: {
      type: String,
      enum: ["Applied", "Online Assessment", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    interviewDate: {
      type: Date,
      default: null
    },
    jobUrl: {
      type: String,
      default: "",
      trim: true
    },
    notes: {
      type: String,
      default: "",
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
