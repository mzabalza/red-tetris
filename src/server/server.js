// import express from 'express';


const express = require('express');

const app = express();


app.get('/user',(req ,res) => {
    
    console.log('blalala')
    res.send({messge: 'blabla'})

})


app.get('/',(req ,res) => {
    console.log('blalala')
    res.send({messge: 'blabla'})

})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to ${port}`)
})