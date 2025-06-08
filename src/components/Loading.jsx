import React from 'react'

const Loading = () => {
  return (
   <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-50 animate-fadeIn">
  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
  <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
  <p className="text-gray-500 mt-2 text-sm">Please wait while we load the page.</p>
</div>
  )
}

export default Loading