
import type React from "react"

import { menu_list } from "../assets/frontend_assets/assets"

interface ExploreMenuProps {
  category: string
  setCategory: (category: string) => void
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
  return (
    <section className="flex flex-col gap-6 md:gap-8" id="explore-menu">
      {/* Header Section */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">Explore our menu</h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis vitae molestiae sint eum fugit non!
        </p>
      </div>

      {/* Menu Categories */}
      <div className="py-4 md:py-6">
        <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 custom-scroll-hidden">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name
            return (
              <div
                key={index}
                onClick={() => setCategory(isActive ? "All" : item.menu_name)}
                className="flex-shrink-0  flex flex-col items-center cursor-pointer group"
              >
                {/* Image Container */}
                <div className="relative">
                  <img
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28  object-cover rounded-full transition-all duration-300 group-hover:scale-105 ${
                      isActive ? "ring-4 ring-orange-500 ring-offset-2 shadow-lg" : "group-hover:shadow-md"
                    }`}
                    src={item.menu_image || "/placeholder.svg"}
                    alt={item.menu_name}
                  />
                  {isActive && <div className="absolute inset-0 rounded-full  bg-orange-500/10" />}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-medium text-center transition-colors duration-200 ${
                    isActive ? "text-orange-600" : "text-gray-600 group-hover:text-gray-800"
                  }`}
                >
                  {item.menu_name}
                </p>
              </div>
            )
          })}
        </div>
      </div>

     
    </section>
  )
}

export default ExploreMenu
