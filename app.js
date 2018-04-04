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

var v_list = [];
var current = front;
var page_num = 0;

window.onYouTubeIframeAPIReady = function() {
  front.player = new YT.Player('front', {
    height: '100%',
    width: '100%',
    videoId: 'GBlorsWgtP0',
    playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0,},
    events: {}
  });

  right.player = new YT.Player('left', {
    height: '100%',
    width: '100%',
    videoId: 'dupiBO-U0P4',
    playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0,},
    events: {}
  });

  left.player = new YT.Player('right', {
    height: '100%',
    width: '100%',
    videoId: 'SxPzkOkEoL0',
    playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0,},
    events: {}
  });

  back.player = new YT.Player('backk', {
    height: '100%',
    width: '100%',
    videoId: 'SxPzkOkEoL0',
    playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0,},
    events: {}
  });

}

onload=function(){
  var angle = 0;
  var cube = document.getElementById("cube");
  current.player.playVideo();

  var requestOptions = {
    chart:"mostPopular",
    maxResults: 20,
    q: "",
    regionCode:"JP",
    type: "video",
    part: "snippet"
  };
  gapi.client.setApiKey("AIzaSyC3VBRnfUU9_qO1Gr1ARBO8BZLT-Sp6vFc");
  var request=gapi.client.request({
    mine:"",
    path:"/youtube/v3/videos",
    params:requestOptions
  });
  request.execute(function(res) {
    if(res.error){
      console.log(res.error.message);
    }else{
      console.log(res.items);
      v_list = res.items;
    }
  });

  document.getElementById("next").onclick = function() {
    if( page_num < v_list.length-1 ){
      current.next.player.playVideo();
      page_num += 1;
      angle -= 90;
      cube.style.webkitTransform = "rotateY("+ angle +"deg)";
      current.player.pauseVideo();
      current = current.next;
      current.next.player.cueVideoById({videoId: v_list[page_num].id});
    }
  };

  document.getElementById("back").onclick = function() {
    if( 0 < page_num ){
      page_num -= 1;
      current.prev.player.playVideo();
      angle += 90;
      cube.style.webkitTransform = "rotateY("+ angle +"deg)";
      current.player.pauseVideo();
      current = current.prev;
    }
  };

  document.getElementById("panel").onclick = function() {
    if(current.player.getPlayerState()==1){
      current.player.pauseVideo();
    }else{
      current.player.playVideo();
    }
  };
}