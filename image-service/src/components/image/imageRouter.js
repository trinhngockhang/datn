import { Router } from "express";
import { throwAsNext } from "../../middleware";
import aws from "aws-sdk";
const multer  = require('multer');

import multerS3 from 'multer-s3';

const path = "/image";
const router = Router();

// const BUCKET_NAME = "vitaminspy1";
// const REGION = "nyc3.digitaloceanspaces.com";
// const CDN = "https://photos.vitaminspy.com/";

const BUCKET_NAME = "vitaminspy2";
const REGION = "sgp1.digitaloceanspaces.com";
const CDN = "https://photos2.vitaminspy.com/";

const spacesEndpoint = new aws.Endpoint(REGION);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, 'datn/' + Date.now().toString() + '-' + file.originalname)
      }
    })
  });
// route
// --- Create item ---
router.post('/upload', uploadS3.array('files'),(req, res) => {
    console.log(req.files);
    res.send({
        code: 0,
        data: req.files.map(a => a.location)
    })
  });
  
// registerSubrouter

// export
export default { path, router };
