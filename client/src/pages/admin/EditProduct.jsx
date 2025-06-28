// src/admin/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const style = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  width: '40vw',
  backgroundColor: 'white',
  borderLeft: '2px solid #000',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  overflowY: 'auto',
  zIndex: 9999,
};

function EditProduct({ productId, onClose, refreshProducts }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [gender, setGender] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSizeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSizes(selected);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${productId}`);
        const data = res.data;
        setName(data.name || '');
        setBrand(data.brand || '');
        setCategory(data.category || '');
        setPrice(data.price || '');
        setOriginalPrice(data.originalPrice || '');
        setSizes(data.sizes || []);
        setColors(data.colors ? data.colors.join(',') : '');
        setDescription(data.description || '');
        setStock(data.stock || '');
        setGender(data.gender || '');
        setIsAvailable(data.isAvailable !== undefined ? data.isAvailable : true);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      brand,
      category,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      sizes,
      colors: colors.split(',').map((c) => c.trim()),
      description,
      stock: parseInt(stock),
      gender,
      isAvailable,
    };

    try {
      await axios.put(`http://localhost:3000/api/products/${productId}`, updatedProduct);
      alert('Product updated successfully!');
      if (refreshProducts) refreshProducts(); // refresh main product list
      if (onClose) onClose(); // close side panel
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className='rounded-l-2xl flex justify-center p-10' style={style}>
      <form onSubmit={handleSubmit} className='w-full space-y-5'>
        <div className='text-3xl font-bold pb-4 text-center'>Edit Product</div>
         {/* product name */}
        <div>
          <label className='font-semibold'>Product Name</label>
          <input
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* brand */}
        <div>
          <label className='font-semibold'>Brand</label>
          <input
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        {/* category */}
        <div>
          <label className='font-semibold'>Category</label>
          <input
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        {/* price */}
        <div className='flex space-x-4'>
          <div className='w-1/2'>
            <label className='font-semibold'>Price</label>
            <input
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className='w-1/2'>
            <label className='font-semibold'>Original Price</label>
            <input
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              type='number'
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
        </div>
        {/* gender */}
        <div>
          <label className='font-semibold'>Gender</label>
          <select
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value=''>Select Gender</option>
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Unisex'>Unisex</option>
          </select>
        </div>
        {/* sizes */}
        <div>
          <label className='font-semibold'>Sizes (Select multiple)</label>
          <select
            multiple
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            value={sizes}
            onChange={handleSizeChange}
          >
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
          </select>
        </div>
        {/* colors */}
        <div>
          <label className='font-semibold'>Colors (comma separated)</label>
          <input
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            type='text'
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            required
          />
        </div>
        {/* description */}
        <div>
          <label className='font-semibold'>Description</label>
          <textarea
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* stock */}
        <div>
          <label className='font-semibold'>Stock</label>
          <input
            className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        {/* is available */}
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <label className='font-semibold'>Is Available</label>
        </div>
        {/* cancel and save changes */}
        <div className='flex justify-end gap-2 mt-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
