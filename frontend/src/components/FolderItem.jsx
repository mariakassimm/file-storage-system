import React from 'react'
import axios from 'axios'

const FolderItem = ({ folder, onFolderClick, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${folder.name}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/folders/${folder._id}`)
        onDelete()
      } catch (error) {
        console.error('Error deleting folder:', error)
        alert('Error deleting folder')
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div 
        className="cursor-pointer flex-grow"
        onClick={() => onFolderClick(folder)}
      >
        <span className="text-black font-medium"> {folder.name}</span>
      </div>
      <button
        onClick={handleDelete}
        className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  )
}

export default FolderItem