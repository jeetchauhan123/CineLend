const express = require('express');
const mongoose = require('mongoose');

// const con=mongoose.

const app = express();

app.use(express.json());

let arr = [1,2,3,4,5,6,7,8,9,10];

app.get('/',(req,res)=>{
    res.send(arr);
});

app.post('/',(req,res)=>{
    const data=req.body;
    const pos=data.pos;
    const val=data.val;
    arr[pos]=val;
    res.send('Updated');
});

app.listen(3000,()=>{
    console.log('server running');
});