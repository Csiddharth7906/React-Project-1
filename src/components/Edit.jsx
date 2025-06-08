import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
 

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setproduct] = useState({
    title: '',
    image: '',
    category: '',
    price: '',
    description: '',
  });

  // Handle input changes
  const ChangeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  // Load product on mount or when id/products change
  useEffect(() => {
    const found = products.find(p => String(p.id) === id);
    if (found) {
      setproduct(found);
    } else {
      alert("Product not found.");
      navigate('/');
    }
  }, [id, products, navigate]);

  // Submit handler
  const AddProductHandler = (e) => {
    e.preventDefault();

    // Validation
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.toString().trim().length < 1 ||
      product.description.trim().length < 10
    ) {
      alert('Please fill all fields with valid data');
      return;
    }

    // Find product index
    const pi = products.findIndex(p => String(p.id) === id);
    if (pi === -1) {
      alert("Product not found in the list.");
      return;
    }

    // Update product
    const copyData = [...products];
    copyData[pi] = { ...copyData[pi], ...product };

    // Save and navigate
    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
  };

  return (
    <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
      <h1 className='text-3xl w-1/2 mb-5'>Edit Product</h1>

      <input
        name='image'
        onChange={ChangeHandler}
        value={product.image}
        type='url'
        placeholder='image-link'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
      />

      <input
        name='title'
        onChange={ChangeHandler}
        value={product.title}
        type='text'
        placeholder='title'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
      />

      <div className='w-1/2 flex justify-between'>
        <input
          name='category'
          onChange={ChangeHandler}
          value={product.category}
          type='text'
          placeholder='category'
          className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-[48%]'
        />

        <input
          name='price'
          onChange={ChangeHandler}
          value={product.price}
          type='number'
          placeholder='price'
          className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-[48%]'
        />
      </div>

      <textarea
        name='description'
        onChange={ChangeHandler}
        value={product.description}
        placeholder='description'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
        rows='10'
      />

      <div className='w-1/2'>
        <button className='py-3 px-5 border rounded border-blue-400 text-blue-400'>
          Save Changes
        </button>
        
      </div>
    </form>
  );
};

export default Edit;
