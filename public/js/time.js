// var checkin=document.getElementById("button").value;
// checkin.addEventListener("click", getTimeStamp());


function getTimeStamp() {
var now = new Date();
alert( "Checked-in at "+'/'+(now.getDate())+ '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + " " + now.getHours() + ':'
            + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
            .getSeconds()) : (now.getSeconds())));
}

document.getElementById("button").addEventListener("click", getTimeStamp);

function changeText(id){
    
    setTimeout(id.innerHTML="Checked-In",10);
    setTimeout("location.reload(true);", 3000);
    }


