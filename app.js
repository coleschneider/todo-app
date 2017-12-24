const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');



const routes = require('./routes/index');
const todos = require('./routes/todos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(__dirname + '/public'));

// MongoDB
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() =>  console.log('connection to MongoDB succesful'))
//   .catch((err) => console.error(err));

if(process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect('mongodb://localhost/todo-api')
}





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', routes);
app.use('/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up and running!');
  
});

module.exports = app;