import axios from '../utils/axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ProductContext } from '../utils/Context';

const Details = () => {
    const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  
useEffect(() => {
  if (!product && products.length > 0) {
    const foundProduct = products.find((p) => p.id === Number(id));
    setproduct(foundProduct);
  }
}, [products, id, product]);

  const ProductDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== Number(id));
    setproducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    navigate('/'); // redirect after delete (optional)
  };

  return product ? (
    <div className='w-[70%] flex h-full items-center justify-between p-[10%] m-auto'>
      <img
        className='object-contain h-[80%] w-[40%]'
        src={product.image}
        alt=''
      />
      <div className='content w-[50%]'>
        <h1 className='text-4xl'>{product.title}</h1>
        <h3 className='text-zinc-400 my-5'>{product.category}</h3>
        <h2 className='text-red-400 mb-3'>${product.price}</h2>
        <p className='mb-[5%]'>{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className='mr-5 py-3 px-5 border rounded border-blue-400 text-blue-400'
        >
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className='py-3 px-5 border rounded border-red-400 text-red-400'
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
