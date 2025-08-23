const express = require('express');
const router = express.Router();
const {
  createFolder,
  getFolders,
  getFolder,
  deleteFolder,
} = require('../controllers/folderController');

router.post('/', createFolder);
router.get('/', getFolders);
router.get('/:id', getFolder);
router.delete('/:id', deleteFolder);

module.exports = router;