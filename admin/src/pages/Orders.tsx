import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error while fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const response = await axios.post(url+'/api/order/status',{
      orderId: orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
      toast.success("Order status updated successfully");
    }else{
      toast.error("Error updating order status");
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Out for delivery":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-10 text-gray-800">
        Orders Management
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No orders found.
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Parcel Icon */}
                <div className="flex-shrink-0">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel"
                    className="w-14 h-14 object-contain"
                  />
                </div>

                {/* Details */}
                <div className="ml-4 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-20">
                  {/* Items */}
                  <div className="w-[max(12vw,35px)]">
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Items
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {order.items.map((item: any, i: number) => (
                        <span key={i}>
                          {item.name} x{item.quantity}
                          {i < order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Delivery Info
                    </h4>
                    <p className="text-gray-800 text-sm font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-gray-600 text-xs leading-tight">
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.country} -{" "}
                      {order.address.zipcode}
                    </p>
                    <p className="text-gray-600 text-xs">
                      Phone: {order.address.phone}
                    </p>
                  </div>

                  {/* Amount and Status */}
                  <div className="flex flex-col gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">
                        Total Amount
                      </h4>
                      <p className="text-green-600 font-semibold text-lg">
                        ${order.amount}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">
                        Status
                      </h4>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex flex-col justify-center items-center">
                  <select
                    className="mt-2 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    defaultValue={order.status}
                    onChange={(e) =>
                      statusHandler(e, order._id)
                    }
                    value={order.status}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
