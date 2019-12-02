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

var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "system123",  
database: "mydb"  
});


app.use(express.static(path.join(__dirname,'public')));



app.post('/Check-In',function(req,res){


    var Name=req.body.Name;
    var email=req.body.email;
    var phone =req.body.phone;
    var Hosts_name=req.body.Hosts_name;
    var Hosts_email=req.body.Hosts_email;
    var Hosts_phone=req.body.Hosts_phone;
    
  
    
    
    res.write('You sent the name "' + req.body.Name+'".\n');
    res.write('You sent the email "' + req.body.email+'".\n');
    res.write('You sent the username "' + req.body.phone+'".\n');
    fs.readFileSync(path.join(__dirname, "/public/js/time.js"));
  
    con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO visitor (Name, email,phone,checkin) VALUES ('"+Name+"', '"+email+"','"+phone+"')";
    sql="INSERT INTO Hostss (Hosts_name, Hosts_email, Hosts_phone) VALUES (' "+Hosts_name+"', '"+Hosts_email+"', '"+Hosts_phone+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
       res.end();
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail',
        pass: 'password'
      }
    });
    
  
  var mailOptions = {
    from: `${this.email}`,
    to: `${this.Hosts_email}`,
    subject: 'Sending Email using Node.js',
    text: `Hello there is an incoming meeting from mr. ${this.Name} ${this.email}`
  };
  
  
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
  
  

   
  });
})

  
app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
