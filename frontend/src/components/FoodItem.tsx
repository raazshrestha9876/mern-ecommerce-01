"use client"

import type React from "react"
import { useContext } from "react"
import { Minus, Plus, Star } from "lucide-react"
import { StoreContext, type Food_list } from "../context/StoreContext"

interface FoodItemProps {
  item: Food_list
}

const FoodItem: React.FC<FoodItemProps> = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, url }: any = useContext(StoreContext)
  const itemCount = cartItems[item._id] || 0

  return (
    <div className="group w-full bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={item.image ? `${url}/images/${item.image}` : "/placeholder.svg"}
          alt={item.name}
          className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay gradient for better button visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Cart Controls */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
          {itemCount === 0 ? (
            <button
              onClick={() => addToCart(item._id)}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group/btn border border-gray-200"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover/btn:scale-110 transition-transform duration-200" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg border border-gray-200">
              <button
                onClick={() => removeFromCart(item._id)}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label={`Remove one ${item.name} from cart`}
              >
                <Minus className="w-4 h-4 text-red-600" />
              </button>

              <span className="min-w-[24px] text-center font-semibold text-gray-800 text-sm sm:text-base">
                {itemCount}
              </span>

              <button
                onClick={() => addToCart(item._id)}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-green-50 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label={`Add another ${item.name} to cart`}
              >
                <Plus className="w-4 h-4 text-green-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header with name and rating */}
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight line-clamp-2 flex-1">
            {item.name}
          </h3>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-600">4.5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">{item.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
          </p>

          {itemCount > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>In cart:</span>
              <span className="font-semibold text-orange-600">{itemCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodItem
