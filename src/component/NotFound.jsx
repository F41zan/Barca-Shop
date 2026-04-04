import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col  sm:ml-20 sm:!mt-64 items-center justify-center sm:items-start sm:justify-start  px-4">
      
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
        404
      </h1>

      <h4 className="mt-4 text-base sm:text-lg md:text-2xl text-gray-500">
        The requested page was not found.
      </h4>

    </div>
  )
}

export default NotFound