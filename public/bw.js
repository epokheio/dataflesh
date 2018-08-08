var DEFAULT=1000;
var lastClick = 0;
var currentInterval = 0;
var interval = 0;
var repeat = setInterval(blinker, DEFAULT);
$("div").click(function(){
	var d = new Date();
      		var t = d.getTime();
	currentInterval = t - lastClick; 
	console.log("current interval is equal to: "+currentInterval);
      		lastClick = t;
	if(currentInterval > 0){
		clearInterval(repeat);
		repeat = setInterval(blinker, currentInterval);
	}
});

function blinker(){
	$("div").toggleClass("place");
}