import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url }: any =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let orderItems: any = [];
    food_list.map((item: any) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          foodId: item._id,
          quantity: cartItems[item._id],
        });
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast("Please, Login");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast("Your cart is empty");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex sm:flex-row flex-col md:flex-row items-start justify-between gap-[50px] mt-[100px]"
    >
      <div className="w-full flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-[max(30%,500px)]">
        <p className="text-[30px] font-[600] mb-[20px]">Delivery Information</p>
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            required
          />
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
        />
        <input
          className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
          required
        />
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-[10px]">
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            required
          />
          <input
            className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />
        </div>
        <input
          className="mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outlflex gap-[10px]"
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />
      </div>

      <div className="w-full max-w-[max(40%,500px)]">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-[30px] font-[600] text-gray-800 mb-6">
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
            type="submit"
            className="w-full sm:w-auto min-w-[200px] mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
