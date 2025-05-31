import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export const StoreContext = createContext<StoreContextValue | null>(null);

export interface Food_list {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

interface StoreContextValue {
  food_list: Food_list[];
  cartItems: { [key: number]: number };
  setCartItems: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: (token: string) => void;
}

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState<string>("");
  const [food_list, setFood_list] = useState<Food_list[]>([]);

  const addToCart = async (itemId: number) => {
    if (!cartItems[itemId]) {
      //not available in the cart
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      //available in the cart but increment
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url+"/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url+"/api/cart/remove",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo && typeof itemInfo.price === "number") {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFood_list(response.data.data);
  };

  const loadCartData = async (token: any) => {
    const response = await axios.post(url+"/api/cart/get",{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const tokenString = localStorage.getItem("token");
      if (tokenString) {
        setToken(JSON.parse(tokenString));
        await loadCartData(JSON.parse(tokenString));
      }
    }
    loadData();
  }, []);

  const contextValue: StoreContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
