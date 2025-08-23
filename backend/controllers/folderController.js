const Folder = require('../models/Folder');

exports.createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    
    let path = name;
    if (parent) {
      const parentFolder = await Folder.findById(parent);
      if (!parentFolder) {
        return res.status(404).json({ message: 'Parent folder not found' });
      }
      path = `${parentFolder.path}/${name}`;
    }

    const folder = new Folder({
      name,
      path,
      parent: parent || null,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().populate('parent');
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate('parent');
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    await Folder.deleteOne({ _id: req.params.id });
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};