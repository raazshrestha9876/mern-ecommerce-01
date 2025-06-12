"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Upload, Package, FileText, Tag, DollarSign, Plus, ImageIcon } from "lucide-react"

const Add = () => {
  const url = "http://localhost:4000"
  const [image, setImage] = useState<File | undefined>(undefined)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    if (image) {
      formData.append("image", image)
    }
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      })
      setImage(undefined)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new food item for your menu</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-8" onSubmit={onSubmitHandler}>
            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Upload Image</label>
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="image" className="cursor-pointer group">
                  <div className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors group-hover:bg-blue-50">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-blue-500">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium">Click to upload</span>
                        <span className="text-xs">PNG, JPG up to 10MB</span>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0])
                    }
                  }}
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Product name</label>
              </div>
              <input
                onChange={onChangeHandler}
                value={data.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                type="text"
                name="name"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Product description</label>
              </div>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                name="description"
                rows={6}
                placeholder="Write product description here..."
                required
              />
            </div>

            {/* Category and Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Product category</label>
                </div>
                <select
                  onChange={onChangeHandler}
                  value={data.category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
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

              {/* Product Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Product price</label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    onChange={onChangeHandler}
                    value={data.price}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                    type="number"
                    name="price"
                    placeholder="20"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-4">
              <button
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-sm"
                type="submit"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add
