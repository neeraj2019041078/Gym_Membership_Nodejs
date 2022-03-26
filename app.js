const express=require("express");
const fs=require("fs");
const path=require("path");
const { name } = require("pug/lib");

const app=express();
const port=80;
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded())//jaise form ka data lana ushke liye use hota


// PUG SPECIFIC STUFF
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory   //views wale folder ke lie

//ENDPOINTS
app.get('/',(req,res)=>{ 
    const con='this is best content on internet so far wisely use it'
    const params={'title':'Neeraj Gym','content': con }
    res.status(200).render('index.pug',params);

})
app.post('/',(req,res)=>{
    name=req.body.name
    age=req.body.age
    gender=req.body.gender
    address=req.body.address
    more=req.body.more

    let OutputToWrite='the name of client ${name},${gender}, ${age} years old,residence at ${address}.More about him/her ${more}'

    fs.writeFileSync('output.txt',OutputToWrite)



    const params={'Message':'your form has been submitted suceesfully'}
    res.status(200).render('index.pug',params);
})


// START THE SERVER
app.listen(port,()=>{
    console.log('the application started sucessfully on port ${port}')
})