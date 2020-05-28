var multer  = require('multer')
const crypto = require('crypto')
var fs = require('fs');

const api = {};

api.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './server/static/images')
        },
        filename: (req, file, cb) => {
            // гунерируем рандомное имя
            let customFileName = crypto.randomBytes(18).toString('hex')
            let fileExtension = file.originalname.split('.')[1]
            cb(null, customFileName + '.' + fileExtension)
        }
      })
    })

module.exports = api;