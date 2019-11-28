var Express=require('express')
const app= new Express();
var fs=require('fs');

var mysql=require('mysql');
app.use(Express.static(__filename+'/public'));
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"system123",
});

// con.connect(function(err){
//     if(err)throw err;
//     console.log("connected!");
//     con.query("CREATE DATABASE mydb", function(err,result){
//         if(err) throw err;
//         console.log("database created");
//     });
// });
fs.readFile('./index.html', function(err, html){
    if(err) throw err;
    app.get("/index.html", (req, res)=>{
        res.writeHeader(200, {"Content-Type": "text/html"})
        res.write(html)
        res.end();
    })
});
app.listen(3000,()=>console.log("server is running"));