require('./app.scss')

onload=function(){
  var angle = 0;
  document.getElementById("cube").onclick = function() {
    console.log("d");
    angle -= 90;
    this.style.webkitTransform = "rotateY("+ angle +"deg)";
  };

}