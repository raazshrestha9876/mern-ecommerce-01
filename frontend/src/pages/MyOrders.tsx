import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token }: any = useContext(StoreContext);
  const [data, setData] = useState([]);
  

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  
  return (
    <div className="my-orders px-4 md:px-10 py-14">
      <h2 className="text-2xl font-bold mb-6 mt-4 text-gray-800">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="hidden sm:table min-w-full bg-white border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300">Icon</th>
              <th className="px-4 py-3 border-b border-gray-300">Items</th>
              <th className="px-4 py-3 border-b text-center border-gray-300">Amount</th>
              <th className="px-4 py-3 border-b text-center border-gray-300">Total Items</th>
              <th className="px-4 py-3 border-b text-center border-gray-300">Status</th>
              <th className="px-4 py-3 border-b text-center border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b border-gray-300">
                  <img src={assets.parcel_icon} alt="parcel" className="w-8 h-8" />
                </td>
                <td className="px-4 py-3 border-b w-[max(14vw,50px)] border-gray-300">
                  {order.items.map((item: any, index: number) => {
                    if (index === order.items.length - 1) {
                      return item.foodId?.name + " X " + item.quantity;
                    } else {
                      return item.foodId?.name + " X " + item.quantity + ", ";
                    }
                  })}
                </td>
                <td className="px-4 py-3 border-b text-center border-gray-300 text-green-600 font-medium">
                  ${order.amount}.00
                </td>
                <td className="px-4 py-3 border-b text-center border-gray-300">{order.items.length}</td>
                <td className="px-4 py-3 border-b text-center border-gray-300">
                  <span className="text-yellow-500 mr-1">&#x25cf;</span>
                  <b>{order.status}</b>
                </td>
                <td className="px-4 text-center py-3 border-b border-gray-300">
                  <button onClick={fetchOrders} className="bg-[tomato] text-white px-3 py-1 rounded hover:opacity-90 cursor-pointer transition text-xs">
                    Track Order
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="sm:hidden flex flex-col gap-4">
          {data.map((order: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img src={assets.parcel_icon} alt="parcel" className="w-6 h-6" />
                <span className="text-gray-600 text-sm">
                  <span className="text-yellow-500">&#x25cf;</span>{" "}
                  <b>{order.status}</b>
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <b>Items:</b>{" "}
                {order.items.map((item: any, idx: number) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <b>Total Items:</b> {order.items.length}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <b>Amount:</b>{" "}
                <span className="text-green-600 font-medium">${order.amount}.00</span>
              </div>
              <button className="w-full mt-2 bg-blue-500 text-white py-1.5 rounded text-sm hover:bg-blue-600 transition">
                Track Order
              </button>
            </div>
          ))}
          {data.length === 0 && (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
