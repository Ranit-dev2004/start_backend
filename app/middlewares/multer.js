const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('idProof');
module.exports = upload;
