
//declarations
const mongodbURI = 'mongodb://localhost:27017/SBLLRLS';
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//create connection for GFS
const conn = mongoose.createConnection(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});

//file stream
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfuploads');
});


//storage engine
const storage = new GridFsStorage({
  url: mongodbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err,buf) => {
        if(err){
          return reject(err);
        }
        //const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: file.originalname,
          bucketName: 'pdfuploads'
        };
        resolve(fileInfo);
      });
    });
  }



});

const upload = multer({storage: storage}).single('file');
const uploadmulti = multer({storage: storage}).array('files');

module.exports.multerUploadFiles = (req, res, next) => {
  uploadmulti(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
  });
}

module.exports.multerUploadFile = (req, res, next) => {
  upload(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
  });
}

//Final (should only be PDF)
module.exports.multerGetPDF = (req, res, next) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    //other validations here**
    //check if file exist.
    if (!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists.'
      });
    }
    //check if correct contentType
    if (file.contentType === 'application/pdf'){

      const readstream = gfs.createReadStream(file.filename);

      readstream.pipe(res);

    }
    else {
      res.status(404).json({
        err: 'Invalid content type.'
      });
    }

  });
}

module.exports.multerDeletePDF = (req, res, next) => {
  gfs.remove({filename: req.params.filename, root:'pdfuploads'}, (err, gridStore) => {
    if(err){
      return res.status(404).json({err: err});
    }
    res.json({error_code:0, error_desc: null, file_deleted: true});
  })
}
