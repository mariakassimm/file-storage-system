import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navigation from '../components/Navigation'
import UploadButton from '../components/UploadButton'
import FolderItem from '../components/FolderItem'
import FileItem from '../components/FileItem'

const Dashboard = () => {
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    fetchFolders()
    fetchFiles()
  }, [currentFolder])

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/folders')
      setFolders(response.data)
    } catch (error) {
      console.error('Error fetching folders:', error)
    }
  }

  const fetchFiles = async () => {
    try {
      const url = currentFolder 
        ? `http://localhost:5000/api/files?folderId=${currentFolder}`
        : 'http://localhost:5000/api/files'
      const response = await axios.get(url)
      setFiles(response.data)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const createFolder = async (e) => {
    e.preventDefault()
    if (!folderName.trim()) return

    try {
      await axios.post('http://localhost:5000/api/folders', {
        name: folderName,
        parent: currentFolder
      })
      setFolderName('')
      fetchFolders()
    } catch (error) {
      console.error('Error creating folder:', error)
      alert('Error creating folder')
    }
  }

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder._id)
  }

  const handleBackClick = () => {
    setCurrentFolder(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="container mx-auto p-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {currentFolder ? `Folder: ${folders.find(f => f._id === currentFolder)?.name}` : 'All Files'}
          </h2>
          {currentFolder && (
            <button
              onClick={handleBackClick}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back to Root
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Create Folder</h3>
              <form onSubmit={createFolder} className="flex">
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="flex-grow border rounded-l p-2"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-r"
                  
                >
                  Create
                </button>
              </form>
            </div>

            <div className="bg-white p-4 rounded shadow mt-4">
              <h3 className="text-lg font-semibold mb-4">Folders</h3>
              <div className="space-y-2">
                {folders.filter(f => f.parent === (currentFolder || null)).map(folder => (
                  <FolderItem
                    key={folder._id}
                    folder={folder}
                    onFolderClick={handleFolderClick}
                    onDelete={fetchFolders}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow">
              <UploadButton onUpload={fetchFiles} currentFolder={currentFolder} />
              
              <h3 className="text-lg font-semibold mb-4">Files</h3>
              <div className="space-y-2">
                {files.length === 0 ? (
                  <p className="text-gray-500">No files found</p>
                ) : (
                  files.map(file => (
                    <FileItem
                      key={file._id}
                      file={file}
                      onDelete={fetchFiles}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard