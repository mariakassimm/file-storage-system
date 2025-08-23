const File = require('../models/File');
const Folder = require('../models/Folder');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const { folderId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let folder = null;
    if (folderId) {
      folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
    }

    const file = new File({
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      path: req.file.path,
      folder: folderId || null,
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { folderId } = req.query;
    let query = {};
    
    if (folderId) {
      query.folder = folderId;
    } else {
      query.folder = null;
    }

    const files = await File.find(query).populate('folder');
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate('folder');
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.download(file.path, file.name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await File.deleteOne({ _id: req.params.id });
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};