import React from 'react'
import axios from 'axios'

const FileItem = ({ file, onDelete }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files/download/${file._id}`, {
        responseType: 'blob',
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Error downloading file')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/files/${file._id}`)
        onDelete()
      } catch (error) {
        console.error('Error deleting file:', error)
        alert('Error deleting file')
      }
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <span className="text-gray-800">{file.name}</span>
        <span className="text-gray-500 text-sm ml-2">({formatFileSize(file.size)})</span>
      </div>
      <div className="space-x-2">
        <button
          onClick={handleDownload}
          className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded"
        >
          Download
        </button>
        <button
          onClick={handleDelete}
          className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default FileItem