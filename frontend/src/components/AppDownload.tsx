import { assets } from "../assets/frontend_assets/assets"

const AppDownload = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24 lg:py-28" id="app-download">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight mb-4">
          For Better Experience Download
          <br />
          <span className="text-orange-600">Tomato App</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Get exclusive deals, faster ordering, and seamless food delivery right at your fingertips
        </p>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <a
          href="#"
          className="group block w-full sm:w-auto max-w-[200px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl"
          aria-label="Download from Google Play Store"
        >
          <img
            className="w-full h-auto rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            src={assets.play_store || "/placeholder.svg"}
            alt="Download from Google Play Store"
          />
        </a>

        <a
          href="#"
          className="group block w-full sm:w-auto max-w-[200px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl"
          aria-label="Download from Apple App Store"
        >
          <img
            className="w-full h-auto rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            src={assets.app_store || "/placeholder.svg"}
            alt="Download from Apple App Store"
          />
        </a>
      </div>

      {/* Additional Features */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
          <p className="text-sm text-gray-600">Quick and reliable food delivery</p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Best Prices</h3>
          <p className="text-sm text-gray-600">Exclusive app-only discounts</p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Easy Ordering</h3>
          <p className="text-sm text-gray-600">Simple and intuitive interface</p>
        </div>
      </div>
    </section>
  )
}

export default AppDownload
