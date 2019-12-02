
var currentDate  = new Date(),
currentDay   = currentDate.getDate() < 10 
             ? '0' + currentDate.getDate() 
             : currentDate.getDate(),
currentMonth = currentDate.getMonth() < 9 
             ? '0' + (currentDate.getMonth() + 1) 
             : (currentDate.getMonth() + 1);

document.getElementById("date").innerHTML = currentDay + '/' + currentMonth + '/' +  currentDate.getFullYear();


     
// function getTimeStamp() {
//     var now = new Date();
//     return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
//                   + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
//                   .getSeconds()) : (now.getSeconds())));
// }
// function setTime() {
//  document.getElementById("field").addEventListener("click", getTimeStamp(){
// alert("it's working")})
//  };