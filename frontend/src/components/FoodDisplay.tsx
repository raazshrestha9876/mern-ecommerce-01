import { useContext, type Key } from "react";
import { StoreContext, type Food_list } from "../context/StoreContext";
import FoodItem from "./FoodItem";

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const storeContext = useContext(StoreContext);
  const food_list = storeContext?.food_list || [];

  return (
    <div className="mt-[30px]" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-[600]">Top dishes near you</h2>
      <div className="grid mt-[30px] gap-[30px] [row-gap:50px] [grid-template-columns:repeat(auto-fill,_minmax(240px,_1fr))]">
        {food_list.map((item: Food_list, index: Key) => {
          if(category==="All" || category===item.category){
             return <FoodItem key={index} item={item} />;
          }
         
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
