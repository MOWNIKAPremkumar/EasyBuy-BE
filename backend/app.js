const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production") {
    //app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.use('/*',express.static(__dirname + './server.js'));
    app.get('/', (req, res) =>{
        //res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
        res.render('EasyBuy E-Commerce Backend Running Successfully')
    })
}
app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})

app.use(errorMiddleware)

module.exports = app;