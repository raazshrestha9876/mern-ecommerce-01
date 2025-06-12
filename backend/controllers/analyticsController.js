import foodModel from "../models/FoodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const getAnalyticsForAdmin = async (req, res) => {
  try {
    // Get total users
    const totalUser = await userModel.countDocuments();

    //Get total foods
    const totalFood = await foodModel.countDocuments();

    // Get total revenue, total order, and total ordered users
    const results = await orderModel.aggregate([
      {
        $match: { status: "Delivered", payment: true },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }, // Sum once per order
          userIds: { $addToSet: "$userId" },
          items: { $push: "$items" },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $first: "$totalRevenue" }, // Preserve from first group
          totalFoodQuantityOrdered: { $sum: "$items.quantity" },
          userIds: { $first: "$userIds" },
          foodIds: { $addToSet: "$items.foodId" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalFoodQuantityOrdered: 1,
          totalOrderedUser: { $size: "$userIds" },
          totalOrdered: { $size: "$foodIds" },
        },
      },
    ]);

    // Get monthly and daily  revenue
    const revenueByDate = await orderModel.aggregate([
      { $match: { status: "Delivered", payment: true } },
      {
        $facet: {
          dailyRevenue: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                dailyRevenue: { $sum: "$amount" },
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id",
                revenue: "$dailyRevenue",
              },
            },
          ],
          monthlyRevenue: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                monthlyRevenue: { $sum: "$amount" },
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: 0,
                month: "$_id",
                revenue: "$monthlyRevenue",
              },
            },
          ],
        },
      },
    ]);

    const { dailyRevenue, monthlyRevenue } = revenueByDate[0];

    const dailyTotalOrdered = await orderModel.aggregate([
      { $match: { status: "Delivered", payment: true } },
      { $unwind: "$items" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          dailyTotalOrdered: { $addToSet: "$items.foodId" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          dailyTotalOrdered: { $size: "$dailyTotalOrdered" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUser,
        totalFood,
        totalRevenue: results[0].totalRevenue,
        totalFoodQuantityOrdered: results[0].totalFoodQuantityOrdered,
        totalOrderedUser: results[0].totalOrderedUser,
        totalOrdered: results[0].totalOrdered,
        monthlyRevenue: monthlyRevenue,
        dailyRevenue: dailyRevenue,
        dailyTotalOrdered: dailyTotalOrdered,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryAnalytics = async (req, res) => {
  try {
    const result = await orderModel.aggregate([
      // Step 1: Filter only delivered and paid orders
      { $match: { status: "Delivered", payment: true } },

      // Step 2: Flatten the items array to process each item individually
      { $unwind: "$items" },

      // Step 3: Join with the food collection to get category and price
      {
        $lookup: {
          from: "foods",
          localField: "items.foodId",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      { $unwind: "$foodDetails" },

      // Step 4: Group by order and category to calculate revenue and quantity
      {
        $group: {
          _id: {
            orderId: "$_id",
            category: "$foodDetails.category",
          },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$foodDetails.price"] }, //for this case revenue without delivery charge
          },
          totalItemsSold: { $sum: "$items.quantity" },
        },
      },

      // Step 5: Group by category to get final totals and order count
      {
        $group: {
          _id: "$_id.category",
          totalRevenue: { $sum: "$totalRevenue" },
          totalItemsSold: { $sum: "$totalItemsSold" },
          orderCount: { $sum: 1 },
        },
      },

      // Step 6: Sort categories by total revenue
      { $sort: { totalRevenue: -1 } },

      {
        $project: {
          _id: 0,
          category: "$_id",
          totalRevenue: 1,
          totalItemsSold: 1,
          orderCount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTopFoods = async (req, res) => {
  try {
    const limit = req.query.limit || 5;

    const result = await orderModel.aggregate([
      // Step 1: Filter only delivered and paid orders
      { $match: { status: "Delivered", payment: true } },

      // Step 2: Flatten the items array
      { $unwind: "$items" },

      // Step 3: Join with foods collection to get food details
      {
        $lookup: {
          from: "foods",
          localField: "items.foodId",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      { $unwind: "$foodDetails" },

      // Step 4: Group by food ID to calculate total items sold and revenue
      {
        $group: {
          _id: "$foodDetails._id",
          name: { $first: "$foodDetails.name" },
          category: { $first: "$foodDetails.category" },
          totalItemsSold: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$foodDetails.price"] }, //for this case revenue without delivery charge
          },
        },
      },

      // Step 5: Sort by total items sold in descending order
      { $sort: { totalItemsSold: -1 } },

      // Step 6: Limit results to top N foods
      { $limit: parseInt(limit) },

      {
        $project: {
          _id: 0,
          foodId: "$_id",
          name: 1,
          category: 1,
          totalItemsSold: 1,
          totalRevenue: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMontlyRevenue = async (req, res) => {
  try {
    const result = await orderModel.aggregate([
      // Filter delivered and paid orders
      { $match: { status: "Delivered", payment: true } },

      // Unwind items array
      { $unwind: "$items" },

      // Group by month and calculate totals
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          totalRevenue: { $sum: "$amount" }, //for this case revenue with delivery charge
          totalItemsSold: { $sum: "$items.quantity" },
          orderCount: { $sum: 1 },
        },
      },

      // Sort by month ascending
      { $sort: { _id: 1 } },

      {
        $project: {
          _id: 0,
          month: "$_id",
          totalRevenue: 1,
          totalItemsSold: 1,
          orderCount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
