require('./app.scss')
var angle = 0;
// $(".front").click(function(){ });
document.getElementsByClassName("cube").onclick = function() {
  console.log("d");
  angle -= 90;
  $(this).css("-webkit-transform", "rotateY("+ angle+"deg)");
};