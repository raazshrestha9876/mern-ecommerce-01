import orderModel from "../models/orderModel.js";


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
            $sum: { $multiply: ["$items.quantity", "$foodDetails.price"] },  //for this case revenue without delivery charge
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
