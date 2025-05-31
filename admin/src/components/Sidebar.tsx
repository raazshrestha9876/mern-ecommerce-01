import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] text-[max(1vw,10px)] min-h-[100vh] border-[1.5px] border-[#a9a9a9] border-t-0">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <NavLink
          to="/add"
          className="flex active:bg-[#fff0ed] active:border-[tomato] items-center gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] [border-radius:3px_0px_0px_3px] cursor-pointer"
        >
          <img src={assets.add_icon} alt="" />
          <p className="[display:none] sm:block">Add items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex active:bg-[#fff0ed] active:border-[tomato] items-center gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] [border-radius:3px_0px_0px_3px] cursor-pointer"
        >
          <img src={assets.order_icon} alt="" />
          <p className="[display:none] sm:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex active:bg-[#fff0ed] active:border-[tomato] items-center gap-[12px] border-[1px] border-[#a9a9a9] border-r-0 py-[8px] px-[10px] [border-radius:3px_0px_0px_3px] cursor-pointer"
        >
          <img src={assets.order_icon} alt="" />
          <p className="[display:none] sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
