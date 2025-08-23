const express = require('express');
const router = express.Router();
const {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  deleteFile,
} = require('../controllers/fileController');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.get('/:id', getFile);
router.get('/download/:id', downloadFile);
router.delete('/:id', deleteFile);

module.exports = router;