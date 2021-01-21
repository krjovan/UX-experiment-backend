const express= require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const config=require('./config/database');
const logger = require('morgan');

//ucitavamo servise
const users=require('./routes/users');
const pdfs=require('./routes/pdfs');
const experiments=require('./routes/experiments');

//konektujemo se na bazu
mongoose.connect(config.database,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
    console.log('Connected to detabase: '+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('Error with connection to db: '+err);
});


//gommila postavki nodejs servera
const app=express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));
app.use(bodyParser.json());

//navodimo nasted putanje iz servisa
app.use('/users',users);
app.use('/pdfs',pdfs);
app.use('/experiments',experiments);

//startujemo server na portu 8080
const port= process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started on port: "+port);
});