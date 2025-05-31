"use client";

import { useContext, useState } from "react";
import {  Menu, X } from "lucide-react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({
  setShowLogin,
}: {
  setShowLogin: (login: boolean) => void;
}) => {

  const navigate = useNavigate();
  const [menu, setMenu] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken }: any = useContext(StoreContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');

  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (menuItem: string) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={assets.logo || "/placeholder.svg"}
                alt="Logo"
                className="h-8 w-auto sm:h-10 lg:h-12 transition-all duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {[
              { key: "home", label: "Home" },
              { key: "menu", label: "Menu" },
              { key: "mobile-app", label: "Mobile App" },
              { key: "contact-us", label: "Contact Us" },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setMenu(item.key)}
                  className={`relative py-2 px-1 text-sm font-medium transition-all duration-200 ${
                    menu === item.key
                      ? "text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {item.label}
                  {menu === item.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right-side Icons and Button */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Search Icon */}
            <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-all duration-200">
              <img
                src={assets.search_icon || "/placeholder.svg"}
                alt="Search"
                className="w-5 h-5"
              />
            </button>

            {/* Basket Icon */}
            <button className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-all duration-200">
              <Link to="/cart">
                <img
                  src={assets.basket_icon || "/placeholder.svg"}
                  alt="Basket"
                  className="w-5 h-5"
                />
              </Link>
              <span
                className={`${
                  getTotalCartAmount() === 0
                    ? ""
                    : "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                }`}
              ></span>
            </button>

            {/* Sign In Button */}
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden sm:inline-flex items-center px-4 py-2 lg:px-6 lg:py-2.5 text-sm font-medium text-orange-600 bg-white border border-orange-200 rounded-full hover:bg-orange-50 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
              >
                Sign In
              </button>
            ) : (
              <div className="relative group cursor-pointer">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-6 object-cover h-6 sm:w-8 sm:h-8 md:h-10 md:w-10 rounded-full"
                />

                <ul className="absolute right-0 z-20 hidden group-hover:flex flex-col min-w-[180px] bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                  <li onClick={() => navigate('/myorders')} className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff2ef] hover:text-[tomato] transition-all duration-200 cursor-pointer">
                    <img
                      src={assets.bag_icon}
                      alt="Orders"
                      className="w-5 h-5"
                    />
                    <span>Orders</span>
                  </li>
                  <hr className="border-t border-gray-200 my-1 mx-2" />
                  <li onClick={logout} className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff2ef] hover:text-[tomato] transition-all duration-200 cursor-pointer">
                    <img
                      src={assets.logout_icon}
                      alt="Logout"
                      className="w-5 h-5"
                    />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 pb-2 space-y-1 border-t border-gray-100">
            {[
              { key: "home", label: "Home" },
              { key: "menu", label: "Menu" },
              { key: "mobile-app", label: "Mobile App" },
              { key: "contact-us", label: "Contact Us" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item.key)}
                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  menu === item.key
                    ? "text-orange-600 bg-orange-50 border-l-4 border-orange-500"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Sign In Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full px-4 py-3 text-base font-medium text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
