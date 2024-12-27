const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Ensure authentication middleware is working
const User = require('../models/User'); // Assuming a User model

// Analytics API
router.get('/', authenticateToken, async (req, res) => {
  try {
    // User Statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true }); // Example field
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    });

    // Monthly Data - Group users by month and count them
    const monthlyData = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract month from createdAt
          year: { $year: "$createdAt" },   // Extract year from createdAt
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 }, // Count the number of users for each month
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
      {
        $project: {
          month: { $arrayElemAt: ["$month", 0] },
          year: { $arrayElemAt: ["$year", 0] },
          count: 1,
        }
      }
    ]);

    // Format monthly data to include month names
    const formattedMonthlyData = monthlyData.map(item => {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      return {
        month: monthNames[item._id.month - 1], // Get the month name
        count: item.count,
      };
    });

    res.json({
      userStats: { totalUsers, activeUsers, newUsersThisMonth },
      monthlyData: formattedMonthlyData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
