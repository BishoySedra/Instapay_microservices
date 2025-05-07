const Report = require('../models/Report');

exports.getSummary = async (req, res) => {
  const userId = req.userId;

  try {
    const report = await Report.findOne({ userId });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ data: report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
