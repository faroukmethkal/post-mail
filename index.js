const express = require("express");
const app = express();


/* var sslRedirect = require("strong-ssl-redirect");

var environment = "production"; /* 'other' 'development', 'production'*/
/* app.use(
  sslRedirect({
    environment,
    www: true,
    status: 301
  })
); */ 

const userRouter = require("./routers/user");
const companyRouter = require("./routers/company");

var bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
// 

mongoose.connect(keys.mongoURI, {useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true ,
      useFindAndModify: false
});

app.use(express.json({extended: false}));
app.use(userRouter);
app.use(companyRouter);



if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
