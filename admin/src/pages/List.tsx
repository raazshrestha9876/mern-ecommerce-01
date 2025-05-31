import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data) {
     console.log(response.data)
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId: string) => {
    const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto mt-10 bg-white  p-6">
      <p className="text-2xl font-bold mb-4 text-gray-800">All Foods List</p>
      <div className="w-full">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 bg-gray-100 rounded-t-md">
          <b className="text-sm text-gray-600">Image</b>
          <b className="text-sm text-gray-600">Name</b>
          <b className="text-sm text-gray-600">Category</b>
          <b className="text-sm text-gray-600">Price</b>
          <b className="text-sm text-gray-600">Action</b>
        </div>
        {list.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition duration-150"
          >
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-md"
            />
            <p className="text-gray-700">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 font-medium">${item.price}</p>
            <button onClick={() => removeFood(item._id)} className="text-red-500 hover:text-red-700 font-semibold cursor-pointer">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
