import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
 const navigate = useNavigate();
  const [products,setproducts]=useContext(ProductContext);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const AddProductHandler = (e) => {
    e.preventDefault();
    if(title.trim().length<5 || image.trim().length<5 | price.trim().length<1 | description.trim().length<10){
        alert('Please fill all fields with valid data');
        return;              
    }
    const product = {
        id: Date.now(),
        title,
        image,
        category,
        price,
        description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));   
    toast.success("Product Added Successfully! ^^");
    navigate('/');

  }
  

  return (
    <form onSubmit={AddProductHandler}  className='flex flex-col items-center p-[5%] w-screen h-screen'>
      <h1 className='text-3xl w-1/2 mb-5'>Add New Product</h1>

      <input
        onChange={(e) => setImage(e.target.value)}
        value={image}
        type='url'
        placeholder='image-link'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
      />

      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type='text'
        placeholder='title'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
      />

      <div className='w-1/2 flex justify-between'>
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type='text'
          placeholder='category'
          className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-[48%]'
        />

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type='number'
          placeholder='price'
          className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-[48%]'
        />
      </div>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder='description'
        className='text-1xl mb-3 bg-zinc-100 rounded p-3 w-1/2'
        rows='10'
      />
      <div className='w-1/2'> 

       <button
       className='  py-3 px-5 border rounded border-blue-400 text-blue-400' 
       >Add New Product
       </button>
       </div>
    </form>
  );
};

export default Create;
