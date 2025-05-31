import { Mail, MapPin, Phone } from "lucide-react"
import { assets } from "../assets/frontend_assets/assets"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-8 sm:mt-12 md:mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <img src={assets.logo || "/placeholder.svg"} alt="Tomato Logo" className="h-8 sm:h-10 w-auto" />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium eligendi magnam tempora, amet ullam
              sint dolor illum hic ad aperiam?
            </p>

            {/* Social Media Links */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on Facebook"
                >
                  <img
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    src={assets.facebook_icon || "/placeholder.svg"}
                    alt=""
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on Twitter"
                >
                  <img
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    src={assets.twitter_icon || "/placeholder.svg"}
                    alt=""
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on LinkedIn"
                >
                  <img
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    src={assets.linkedin_icon || "/placeholder.svg"}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Company</h3>
            <nav>
              <ul className="space-y-3">
                {["Home", "About Us", "Delivery", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <a href="tel:+977981023222" className="text-gray-400 hover:text-white transition-colors duration-200">
                  +977 981023222
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base">
                <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <a
                  href="mailto:contact@tomato.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  contact@tomato.com
                </a>
              </div>

              <div className="flex items-start gap-3 text-sm sm:text-base">
                <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <address className="text-gray-400 not-italic leading-relaxed">
                  123 Food Street
                  <br />
                  Kathmandu, Nepal
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
              <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              &copy; {currentYear} Tomato.com - All Rights Reserved.
            </p>

            <div className="flex gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
