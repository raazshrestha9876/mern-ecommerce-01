import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({
  setShowLogin,
}: {
  setShowLogin: (login: boolean) => void;
}) => {
  const { url, setToken }: any = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl = newUrl + "/api/user/login";
    } else {
      newUrl = newUrl + "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="absolute z-[1] w-full h-full grid">
      <form
        onSubmit={onAuth}
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-[8px] text-[14px] animate-fadeIn duration-500"
      >
        <div className="flex justify-between items-center text-black">
          <h2>{currState}</h2>
          <img
            className="w-[16px] cursor-pointer"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              className="outline-0 border-[1px] border-[#c9c9c9] p-[10px] rounded-[4px]"
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your name"
              required
            />
          )}
          <input
            className="outline-0 border-[1px] border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="enail"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your email"
            required
          />
          <input
            className="outline-0 border-[1px] border-[#c9c9c9] p-[10px] rounded-[4px]"
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="border-0 p-[10px] rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer"
        >
          {currState == "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-[8px] mt-[-15px]">
          <input type="checkbox" required className="mt-[5px]" />
          <p>By continuing, i agree to the ters of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-[tomato] font-[500] cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
