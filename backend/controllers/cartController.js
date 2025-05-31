import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = userData.cartData || {};

    // Add item or increment quantity
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    // Update user cartData in DB
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Send success response
    res.status(201).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    // Send error response
    res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    // Remove item from cartData
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    // Send success response
    res.status(201).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ sucess: true, message: Error });
  }
};

//fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
