const express = require('express');
const app = express();
const path= require('path');
const morgan = require('morgan');
const cors = require('cors');
const { asap } = require('rxjs');
//Setting
app.set('port',8001 );
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index'));

//Static
app.use(express.static(path.join(__dirname,'public')));

//404 handler
app.use((req, res, next)=>{
    res.status(404).send('404 not found');
});

module.exports = app ;