const express = require('express')
const router = express.Router()
const Invoice = require('../../server/models/invoice');
const passport = require('passport');
const multer = require("multer")
/*
@req: post
router   api/invoice/create
pdf 
@description: create a new invoice page
@access: private
*/ 

const storage = multer.diskStorage({
    destination: "./invoice",
    filename:function(req , file , cb){
     console.log(file)
      cb(null , Date.now() + '_' + file.originalname );
    }
  })
  const upload = multer({
    storage: storage,
       fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png)$/)) {
        return cb(new Error('Only pdf files are allowed!'));
      }
       cb(null, true);
    }

  })

router.post('/create', upload.single('file'), (req, res) => {
    const invoiceData = {};
    invoiceData.month = req.body.month;
    invoiceData.week = req.body.week;
    invoiceData.client_name = req.body.client_name;
    invoiceData.invoice_date = req.body.invoice_date;
    invoiceData.created_time = req.body.created_time ;
    invoiceData.bank_account = req.body.bank_account;
    invoiceData.usd = req.body.usd;
    invoiceData.sent_via = req.body.sent_via;
    invoiceData.released_inr = req.body.released_inr;
    invoiceData.released_date = req.body.released_date;
    invoiceData.document = req.file.filename;

    const invoice = new Invoice(invoiceData);
    invoice.save()
       .then(() => res.status(201).json(invoice))
       .catch(err => res.status(400).json(err));
});
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  Invoice.find()
       .then(result => res.status(200).json(result))
       .catch(() => res.status(404).json({notFound: 'month doesn\'t exist'}));
});
 
module.exports = router