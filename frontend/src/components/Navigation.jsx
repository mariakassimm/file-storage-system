import React from 'react'

const Navigation = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">File Storage System</h1>
        <div className="flex space-x-4">
          <button className="bg-black hover:bg-gray-800 px-4 py-2 rounded">
            Refresh
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation