const path = require('path');
const http = require('http');
var document;
const express = require('express');
var app=express();
const port = process.env.PORT||3000;
// var urlencodedParser = bodyParser.urlencoded({ extended: false })  
var mysql = require('mysql');
var bodyParser = require('body-parser');    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var fs=require('fs');
var nodemailer=require('nodemailer');
// var today=require('./public/js/time.js');
let now = new Date();

var row;
var visitName
   var hostemail
  var visitorphone
  var checkintime;


app.use(express.static(path.join(__dirname,'public')));




app.post('/Check-In',function(req,res){

  var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "system123",  
    database: "entry"  
    });

    
var transporter1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lieuanas456@gmail.com',
    pass: 'anascan123@'
  }
});

    var Name=req.body.Name;
    var email=req.body.email;
    var phone =req.body.phone;
    var Hosts_name=req.body.Hosts_name;
    var Hosts_email=req.body.Hosts_email;
    var Hosts_phone=req.body.Hosts_phone;
    //var Phone_=req.body.phone_no;

    var CheckInTime= now.getFullYear() +"-"+(now.getMonth() + 1)+"-"+(now.getDate())+ " "+ now.getHours() + ':'
    + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes()))+ ':' + ((now.getSeconds() < 10) ? ("0" + now
    .getSeconds()) : (now.getSeconds()));

    
    fs.readFileSync(path.join(__dirname, "/public/js/time.js"));
  
    con.connect(function(err) {
    if (err) throw err;
    var sqlv = "INSERT INTO meeting (visitor_name, host_name,visitor_email, host_email, visitor_phone,host_phone ,checkin) VALUES ('"+Name+"', ' "+Hosts_name+"', ' "+email+"','"+Hosts_email+"','"+phone+"', '"+Hosts_phone+"','"+CheckInTime+"')"


    con.query(sqlv, function (err, result) {
      if (err) throw err;
      console.log("visitor record inserted");
       res.end();
    });

  var mailOptions = {
    from: `${req.body.Name}`,
    to: `${req.body.Hosts_email}`,
    subject: 'Sending Email using Node.js',
    text: `Hello there is an incoming meeting from mr. ${req.body.Name} ${req.body.email}`
  };
  
  
  transporter1.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
 
  })
  res.redirect('/');
  
})

app.post('/Check-out',function(req,res){

  var transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lieuanas456@gmail.com',
      pass: 'anascan123@'
    }
  });

  var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "system123",  
    database: "entry"  
    })

    var CheckOutTime= now.getFullYear() +"-"+(now.getMonth() + 1)+"-"+(now.getDate())+ " "+ now.getHours() + ':'
    + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes()))+ ':' + ((now.getSeconds() < 10) ? ("0" + now
    .getSeconds()) : (now.getSeconds()))

    con.query("SELECT* FROM meeting  WHERE visitor_phone="+req.body.phoneno,function(err,result){
      if(err) throw err;
      Object.keys(result).forEach(function(key) {
         row = result[key];
        console.log(row)
        
        console.log(row.host_name)
        console.log(row.visitor_phone)
         visitName=row.visitor_name
         hostemail=row.host_email
         console.log(hostemail)
         visitorphone=row.visitor_phone;
         checkintime=row.checkin;
       
      });
    })

    // var cout="INSERT INTO visitor (checkout) WHERE visitor_phone= "+req.body.phoneno+"'VALUES('"+CheckOutTime+"')"
    // con.query(cout, function(err){
    //   if(err)throw err;
    //   console.log("checkout inserted")
    // })

    var mailOptions = {
      from: `${visitName}`,
      to: `${hostemail}`,
      subject: 'Sending Email using Node.js',
      text: `Your meeting period with Mr ${visitName} was from ${checkintime} and it's been over`
    };
    
    
    transporter2.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    });

  
   

    res.redirect('/')
  })




  
app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
