// src/components/admin/Addproduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';

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
};

function Addproduct() {
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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error('Error fetching current user:', err.response?.data || err.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSizeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSizes(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';

      // Upload image to Cloudinary if file is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
          formData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }

      if (!imageUrl) {
        alert('Image upload failed. Please select an image.');
        setUploading(false);
        return;
      }

      if (!currentUser?._id) {
        alert('User not loaded. Please try again.');
        setUploading(false);
        return;
      }

      // Create product data object
      const productData = {
        name,
        brand,
        category,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        sizes,
        colors: colors.split(',').map(c => c.trim()),
        description,
        stock: parseInt(stock),
        createdBy: currentUser._id, // auto use logged-in user id
        gender,
        images: [imageUrl]
      };

      console.log('Sending Product:', productData);

      // Send product data to backend
      const res = await axios.post('http://localhost:3000/api/products', productData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      console.log('Product created:', res.data);

      // Reset form
      setName('');
      setBrand('');
      setCategory('');
      setPrice('');
      setOriginalPrice('');
      setSizes([]);
      setColors('');
      setDescription('');
      setStock('');
      setImageFile(null);
      setGender('');

    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='rounded-l-2xl flex justify-center p-10' style={style}>
      {!currentUser ? (
        <div className="text-center text-lg">Loading user info...</div>
      ) : (
        <form onSubmit={handleSubmit} className='w-full space-y-5'>
          <div className='text-3xl font-bold pb-4 text-center'>Add Product</div>

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

          <div>
            <label className='font-semibold'>Brand</label>
            <input
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

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

          <div>
            <label className='font-semibold'>Colors (comma separated)</label>
            <input
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              type='text'
              placeholder='e.g. Red, Blue, Black'
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='font-semibold'>Product Image (Upload)</label>
            <input
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              type='file'
              accept='image/*'
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className='font-semibold'>Description</label>
            <textarea
              className='w-full p-2 border rounded-lg bg-gray-100 mt-1'
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

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

          <button
            type='submit'
            disabled={uploading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg transition disabled:bg-gray-400'
          >
            {uploading ? 'Uploading...' : 'Submit Product'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Addproduct;
