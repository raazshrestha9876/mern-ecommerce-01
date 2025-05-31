import { useContext, type Key } from "react";
import { StoreContext, type Food_list } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url }: any =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="mt-24 px-4 max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-7 gap-4 px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
            <div className="text-left">Items</div>
            <div className="text-left col-span-2">Title</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Total</div>
            <div className="text-center">Remove</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {food_list.map((item: Food_list, index: Key) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-7 gap-4 px-6 py-4 items-center">
                    {/* Item Image */}
                    <div className="flex justify-start">
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>

                    {/* Item Title */}
                    <div className="col-span-2">
                      <p className="font-medium text-gray-900 text-sm leading-tight">
                        {item.name}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <p className="text-gray-700 font-medium text-sm">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        {cartItems[item._id]}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="text-center">
                      <p className="text-gray-900 font-bold text-sm">
                        ${(item.price * cartItems[item._id]).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="text-center">
                      <button
                        onClick={() => removeFromCart(parseInt(item._id))}
                        className="w-8 h-8 mx-auto flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-full transition-colors duration-200 font-bold text-sm"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Empty State */}
        {!food_list.some((item: Food_list) => cartItems[item._id] > 0) && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="mt-20 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 xl:gap-20 mx-auto">
        {/* Cart Totals Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Cart Totals
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-600 py-2">
              <p className="text-sm sm:text-base">Subtotal</p>
              <p className="text-sm sm:text-base font-medium">
                ${getTotalCartAmount()}
              </p>
            </div>
            <hr className="border-gray-200" />

            <div className="flex justify-between items-center text-gray-600 py-2">
              <p className="text-sm sm:text-base">Delivery Fee</p>
              <p className="text-sm sm:text-base font-medium">
                ${getTotalCartAmount() === 0 ? 0 : 2}
              </p>
            </div>
            <hr className="border-gray-200" />

            <div className="flex justify-between items-center text-gray-800 py-2 pt-4">
              <b className="text-base sm:text-lg">Total</b>
              <b className="text-base sm:text-lg">
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="w-full sm:w-auto min-w-[200px] mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1 h-[140px] bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              If you have a promo code, Enter it here
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 bg-gray-100 rounded-md p-1">
              <input
                className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-gray-700 placeholder-gray-500 text-sm sm:text-base rounded-md sm:rounded-r-none focus:bg-white transition-colors duration-200"
                type="text"
                placeholder="Enter promo code"
              />
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md sm:rounded-l-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 whitespace-nowrap">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
