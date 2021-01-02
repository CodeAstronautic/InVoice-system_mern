const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const app = express();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(require('cors')());
app.use(require('helmet')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
// DB Connection
require('./libs/db-connection');
// Passport
require('./config/passport')(passport);

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));
app.use('/api/invoice' , require('./routes/invoice'))
app.use('/api/month' , require('./routes/month'))
app.use('/api/week' , require('./routes/week'))

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));