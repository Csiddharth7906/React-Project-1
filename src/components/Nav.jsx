import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [products]=  useContext(ProductContext);   
    

    let distinct_category =products && products.reduce((acc, cv) => [...acc,cv.category],[]);
    distinct_category = [...new Set(distinct_category)];
    
   const color = () => {
  return `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 1)`;
}
    // will print distinct category names in console
  return (
    <>
          <nav className='w-[15%]   bg-zinc-50 flex flex-col items-center  pt-5'>

      <a className='py-3 px-5 border rounded border-blue-400 text-blue-400' href="/create">Add New Product</a>
      <hr className='w-[80%] my-3'/>
      <h1 className='text-2xl  mb-3 w-[80%]'>Category Filter</h1>
      <div className=' w-[80%]'>

        {distinct_category.map((c,i)=>{

      return <Link key={i} to={`/?category=${c}`} className='mb-3 flex items-center '>
          <span style={{backgroundColor:color()}} className=' w-[15px] mr-2 h-[15px]  rounded-full '>
            </span>
             {c}   
        </Link>

 
        })}

       
        
        
        
      </div>
      </nav>
    </>

  )
}

export default Nav