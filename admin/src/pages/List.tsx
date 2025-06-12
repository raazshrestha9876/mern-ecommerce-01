"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Trash2, Package } from "lucide-react"

interface FoodItem {
  _id: string
  name: string
  category: string
  price: number
  image: string
}

const List = () => {
  const url = "http://localhost:4000"
  const [list, setList] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data) {
        console.log(response.data)
        setList(response.data.data)
      } else {
        toast.error("Error")
      }
    } catch (error) {
      toast.error("Failed to fetch food list")
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (foodId: string) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`)
      await fetchList()
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error("Error")
      }
    } catch (error) {
      toast.error("Failed to remove food item")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Foods List</h1>
              <p className="text-gray-600">Manage your food items and menu</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {list.length} items
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-[80px_1fr_150px_120px_100px] items-center gap-4 py-4 px-6">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Details</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {list.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
                <p className="text-gray-600">Start by adding your first food item to the menu.</p>
              </div>
            ) : (
              list.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[80px_1fr_150px_120px_100px] items-center gap-4 py-4 px-6 hover:bg-gray-50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=56&width=56"
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Food Item</p>
                  </div>

                  {/* Category */}
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-sm font-semibold text-gray-900">${item.price}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFood(item._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        {list.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div>Showing {list.length} food items</div>
            <div className="flex items-center gap-2">
              <span>Total items: {list.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
