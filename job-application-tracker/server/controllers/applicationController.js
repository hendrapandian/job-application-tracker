const mongoose = require("mongoose");
const Application = require("../models/Application");

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.userId
    }).sort({ applicationDate: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.userId
    });

    const stats = {
      total: applications.length,
      applied: applications.filter((a) => a.status === "Applied").length,
      onlineAssessment: applications.filter(
        (a) => a.status === "Online Assessment"
      ).length,
      interview: applications.filter((a) => a.status === "Interview").length,
      offer: applications.filter((a) => a.status === "Offer").length,
      rejected: applications.filter((a) => a.status === "Rejected").length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
};

exports.getApplication = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message
    });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      salary,
      status,
      applicationDate,
      interviewDate,
      jobUrl,
      notes
    } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        message: "Company and position are required"
      });
    }

    const application = await Application.create({
      userId: req.userId,
      company,
      position,
      location,
      salary,
      status,
      applicationDate,
      interviewDate: interviewDate || null,
      jobUrl,
      notes
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create application",
      error: error.message
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application",
      error: error.message
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application",
      error: error.message
    });
  }
};
