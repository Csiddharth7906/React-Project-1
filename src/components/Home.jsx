import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'

const Home = () => {
  const [products]=  useContext(ProductContext);
  const {search} =useLocation( );
  const category =decodeURIComponent(search.split('=')[1]);
  
 const [filteredProducts, setFilteredProducts] = useState(null);
 
  const getProductscategory = async() => {
    try{
        const {data} = await axios.get(`/products/category/${category}`);
         setFilteredProducts(data);
        console.log(data);
    }catch(error){
        console.error(error);
    }
  };
  useEffect(() => {
    if(!filteredProducts || category =="undefined") setFilteredProducts(products);
  if (category !="undefined") {
  // getProductscategory();
    setFilteredProducts(products.filter(p=>p.category == category))
  } 
}, [category, products]);

  
 
  return products ?(
    <>

    <Nav />
    
    <div className='overflow-x-hidden overflow-y-auto h-full w-[85%] flex flex-wrap   p-10 pt-[5%]'>
       

         {filteredProducts && filteredProducts.map((p,i)=>(

       <Link key={p.id}  to={`/details/${p.id}`} className='mr-3 mb-3  card w-[18%] h-[30vh] flex flex-col  justify-center items-center  p-3 border shadow rounded'>
           <div className='w-full h-[80%] hover:scale-110  mb-3 bg-contain bg-no-repeat bg-center ' style=
           {{
            backgroundImage:`url(${p.image})`,

            }}></div>
            <h1 className='hover:text-blue-400  '>{p.title} </h1>
        </Link>




         ))}
       





      </div> 
      </> ): <Loading />

  
}

export default Home