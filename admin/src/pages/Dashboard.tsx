"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Users, Utensils, ShoppingBag, DollarSign, TrendingUp, Package, ShoppingCart } from "lucide-react"

const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUser: 0,
    totalOrderedUser: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalFoodQuantityOrdered: 0,
    totalFood: 0,
    totalOrdered: 0,
    dailyRevenue: [],
    dailyTotalOrdered: [],
  })
  const [topFoods, setTopFoods] = useState([])
  const [categoryAnalytics, setCategoryAnalytics] = useState([])

  const url = "http://localhost:4000"

  const getCardAnalytics = async () => {
    try {
      const response = await axios.get(`${url}/api/analytics/get-admin-analytics`)
      const data = response.data.data

      const currentMonth = new Date().toISOString().slice(0, 7)
      const currentMonthData = data.monthlyRevenue.filter((d: any) => d.month === currentMonth)

      const currentMonthlyRevenue = currentMonthData.map((item: any) => item.revenue)

      setAnalyticsData({
        ...analyticsData,
        totalUser: data.totalUser,
        totalOrderedUser: data.totalOrderedUser,
        totalRevenue: data.totalRevenue,
        monthlyRevenue: currentMonthlyRevenue[0],
        totalFoodQuantityOrdered: data.totalFoodQuantityOrdered,
        totalFood: data.totalFood,
        totalOrdered: data.totalOrdered,
        dailyRevenue: data.dailyRevenue,
        dailyTotalOrdered: data.dailyTotalOrdered,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getTop5Food = async () => {
    try {
      const response = await axios.get(`${url}/api/analytics/get-top-foods`)
      const data = response.data.data
      const topFoods = data.map((item: any) => ({
        name: item.name,
        orders: item.totalItemsSold,
      }))
      setTopFoods(topFoods)
    } catch (error) {
      console.log(error)
    }
  }

  const getCategoryAnalytics = async () => {
    try {
      const response = await axios.get(`${url}/api/analytics/get-category-analytics`)
      const data = response.data.data

      const result = data.map((item: any) => ({
        category: item.category,
        totalItemsSold: item.totalItemsSold,
      }))
      setCategoryAnalytics(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCardAnalytics()
    getTop5Food()
    getCategoryAnalytics()
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-600 text-sm">{`${label}`}</p>
          <p className="text-blue-600 font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-600 text-sm">{payload[0].name}</p>
          <p className="text-blue-600 font-semibold">{`Orders: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your restaurant analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{analyticsData.totalUser.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Food</p>
                <p className="text-2xl font-bold text-orange-600">{analyticsData.totalFood.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Total Food Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Ordered Users</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.totalOrderedUser.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${analyticsData.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-indigo-600">${analyticsData.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Ordered</p>
                <p className="text-2xl font-bold text-teal-600">{analyticsData.totalOrdered.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow sm:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Food Quantity Ordered</p>
                <p className="text-2xl font-bold text-rose-600">
                  {analyticsData.totalFoodQuantityOrdered.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Top 5 Foods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Top 5 Food Items</h2>
              <p className="text-sm text-gray-600">Most popular items by orders</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topFoods} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orders"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Daily Revenue</h2>
              <p className="text-sm text-gray-600">Revenue trends over time</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analyticsData.dailyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ fill: "#F97316", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#F97316", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Total Food Daily Ordered</h2>
              <p className="text-sm text-gray-600">Daily order volume trends</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analyticsData.dailyTotalOrdered} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="dailyTotalOrdered"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Total Ordered Food by Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Total Ordered Food by Category</h2>
              <p className="text-sm text-gray-600">Distribution of orders by food category</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryAnalytics}
                  dataKey="totalItemsSold"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryAnalytics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
