import { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState<File | undefined>(undefined);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(undefined);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <form className="gap-[20px] ml-[100px] mt-[50px] flex-column" onSubmit={onSubmitHandler}>
      <div className="w-[120px] flex-column">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          type="file"
          id="image"
          hidden
          required
        />
      </div>

      <div className="w-[max(40%,280px]) flex-column">
        <p>Product name</p>
        <input
          onChange={onChangeHandler}
          value={data.name}
          className="p-[10px] border-1 border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-[tomato]"
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="w-[max(40%,280px]) flex-column">
        <p>Product description</p>
        <textarea
          onChange={onChangeHandler}
          value={data.description}
          className="p-[10px] border-1 border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-[tomato]"
          name="description"
          rows={6}
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex gap-[30px]">
        <div className="flex-column">
          <p>Product category</p>
          <select
            onChange={onChangeHandler}
            className="max-w-[120px] p-[10px] border-1 border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-[tomato]"
            name="category"
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        <div className="flex-column">
          <p>Product price</p>
          <input
            onChange={onChangeHandler}
            value={data.price}
            className="max-w-[120px] p-[9px] border-1 border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-[tomato]"
            type="number"
            name="price"
            placeholder="$20"
          />
        </div>
      </div>
      <button
        className="max-w-[120px] mt-2 rounded-sm cursor-pointer border-0 text-white bg-black p-[10px] outline-none focus:ring-1 focus:ring-[tomato]"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
