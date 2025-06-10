import foodModel from "../models/FoodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to place a new order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    // 1. Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      })),
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // 2. Clear the user's cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const foodIds = req.body.items.map((item) => item.foodId);
    const foodItems = await foodModel.find({ _id: { $in: foodIds } });

    // 3. Prepare order items for Stripe checkout
    const line_items = req.body.items.map((item) => {
      const food = foodItems.find(
        (food) => food._id.toString() === item.foodId
      );
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: food.name,
          },
          unit_amount: food.price * 100,
        },
        quantity: item.quantity,
      };
    });

    // 4. Add fixed delivery fee to line items
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // 5. Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // 6. Send session URL to frontend
    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.status(200).json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: true, message: "Not Paid" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

//users orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        userId: req.body.userId,
      })
      .populate({
        path: "items.foodId",
        model: "food",
        select: "name price",
      });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

//listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate({
      path: "items.foodId",
      model: "food",
      select: "name price",
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateOrderStatus = async (req, res) => {
  try {
    let payment;
    if (req.body.status === "Delivered") {
      payment = true;
    }
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
      payment: payment,
    });
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };
