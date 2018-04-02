require('./app.scss')

var front = { player: null, next: null, prev: null };
var right = { player: null, next: null, prev: null };
var back =  { player: null, next: null, prev: null };
var left =  { player: null, next: null, prev: null };

front.next = right;
front.prev = left;
right.next = back;
right.prev = front;
back.next  = left;
back.prev  = right;
left.next  = front;
left.prev  = back;

var current = front;
var v_list = ['GBlorsWgtP0','SxPzkOkEoL0',"aANfGnP4a4",];

window.onYouTubeIframeAPIReady = function() {
  front.player = new YT.Player('front', {
    height: '100%',
    width: '100%',
    videoId: 'GBlorsWgtP0',
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {}
  });

  right.player = new YT.Player('left', {
    height: '100%',
    width: '100%',
    videoId: 'SxPzkOkEoL0',
    playerVars: { 'controls': 0 },
    events: {}
  });

  left.player = new YT.Player('right', {
    height: '100%',
    width: '100%',
    videoId: 'SxPzkOkEoL0',
    playerVars: { 'controls': 0 },
    events: {}
  });

  back.player = new YT.Player('backk', {
    height: '100%',
    width: '100%',
    videoId: 'SxPzkOkEoL0',
    playerVars: { 'controls': 0 },
    events: {}
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

onload=function(){
  var angle = 0;
  var cube = document.getElementById("cube");

  document.getElementById("next").onclick = function() {
    current.next.player.playVideo();
    angle -= 90;
    cube.style.webkitTransform = "rotateY("+ angle +"deg)";
    current.player.pauseVideo();
    current = current.next;
    current.next.player.loadVideoById({videoId:'SxPzkOkEoL0'});
  };

  document.getElementById("back").onclick = function() {
    current.prev.player.playVideo();
    angle += 90;
    cube.style.webkitTransform = "rotateY("+ angle +"deg)";
    current.player.pauseVideo();
    current = current.prev;
  };
}