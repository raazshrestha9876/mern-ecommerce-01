import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url }: any = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success===true) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="min-h-[60vh] grid">
      <div className="w-[100px] h-[100px] place-self-center border-[5px] border-t-[tomato] rounded-[50%] animate-spin duration-1000"></div>
    </div>
  );
};

export default VerifyOrder;
