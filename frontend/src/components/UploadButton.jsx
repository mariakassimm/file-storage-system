import React, { useRef } from 'react'
import axios from 'axios'

const UploadButton = ({ onUpload, currentFolder }) => {
  const fileInputRef = useRef(null)

  const handleUpload = async (e) => {
    const files = e.target.files
    if (!files.length) return

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }
    
    if (currentFolder) {
      formData.append('folderId', currentFolder)
    }

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      onUpload()
      alert('Files uploaded successfully!')
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files')
    }
  }

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload Files
      </button>
    </div>
  )
}

export default UploadButton