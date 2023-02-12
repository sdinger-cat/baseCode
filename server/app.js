const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv")
const cors = require("cors");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// 환경 변수 셋팅
//dotenv.config({ path : path.join(__dirname, ".env.dev")})
dotenv.config({ path : path.join(__dirname, ".env")})
process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == "production" ? "production" : "development"
console.log("stratMode : ", process.env.NODE_ENV)

// CORS 설정
// production 모드에서 활용
const whitelist = ["http://localhost:3000", "https://basecode.com"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials:true,
};

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV == "production") {
  app.use(cors(corsOptions));
  console.log("Cost start Production Mode");
} else {
  app.use(cors());
  console.log("Cost start Development Mode");
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
