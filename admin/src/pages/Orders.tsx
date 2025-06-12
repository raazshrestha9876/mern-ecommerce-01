"use client"

import type React from "react"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Package, MapPin, Phone, DollarSign, Clock, Truck, CheckCircle, User, ShoppingBag } from "lucide-react"

interface OrderItem {
  foodId: {
    name: string
  }
  quantity: number
}

interface Address {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  phone: string
}

interface Order {
  _id: string
  items: OrderItem[]
  address: Address
  amount: number
  status: string
  createdAt?: string
}

const Orders = () => {
  const url = "http://localhost:4000"
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      toast.error("Server error while fetching orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const statusHandler = async (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: event.target.value,
      })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Order status updated successfully")
      } else {
        toast.error("Error updating order status")
      }
    } catch (error) {
      toast.error("Failed to update order status")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200"
      case "Out for delivery":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Food Processing":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />
      case "Out for delivery":
        return <Truck className="w-4 h-4" />
      case "Food Processing":
        return <Clock className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-2 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {orders.length} orders
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Orders will appear here when customers place them.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6)}</h3>
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Order Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-gray-600" />
                        <h4 className="text-sm font-semibold text-gray-700">Order Items</h4>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-gray-700">{item.foodId?.name}</span>
                              <span className="text-gray-600 font-medium">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <h4 className="text-sm font-semibold text-gray-700">Delivery Information</h4>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {order.address.firstName} {order.address.lastName}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {order.address.street}
                            <br />
                            {order.address.city}, {order.address.state}
                            <br />
                            {order.address.country} - {order.address.zipcode}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{order.address.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="space-y-4">
                      {/* Amount */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-gray-600" />
                          <h4 className="text-sm font-semibold text-gray-700">Order Total</h4>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-600">${order.amount}</div>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">Update Status</h4>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-sm"
                          value={order.status}
                          onChange={(e) => statusHandler(e, order._id)}
                        >
                          <option value="Food Processing">Food Processing</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {orders.length > 0 && (
          <div className="mt-8 flex items-center justify-between text-sm text-gray-600">
            <div>Showing {orders.length} orders</div>
            <div className="flex items-center gap-4">
              <span>Total orders: {orders.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
