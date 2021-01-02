const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/index');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
/* */
mongoose.connect("mongodb+srv://invoiceSystem:RDvpIqwT4wAjqlMa@pm.1tahh.mongodb.net/Invoice?retryWrites=true&w=majority", { useNewUrlParser: true });
// Validation
 mongoose.connection
  .on('open', () => console.info('Database connected!'))
  .on('error', err => console.info('Create a database and put the link into config/index.js/MONGO_URL'));