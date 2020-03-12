
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.AmbientLight( 0x404040 );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const display = document.getElementsByTagName("CANVAS")[0];
//if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
 



var loop;


var update = function(){
	gal.update();
	ovl.update();
}

var getJson = function() {
	return $.ajax({ 
        type: "GET",
        dataType: "json",
        url: "objects.json",
        async: false
    }).responseText; 

};




var setup = function(){
	var json =JSON.parse(getJson("objects.json"));
	gal = new gallery(json.Item);
	ovl = new overlay(json.Item,gal);
	scene.add(gal.group);
	scene.add(light);
	camera.position.z=20;

	
}();

var mousex,mousedown= false;

display.onmousedown  = function(e){
	mousex = e.clientX;
	mousedown = true;
}

display.onmouseup = function(e){
	mousex=null;
	mousedown = false;
}

display.onmousemove = function(e){
	if(mousedown)
	gal.velocity += Math.max(-.05, Math.min(.05, ( mousex- e.clientX )));
	mousex = e.clientX;
}

display.onwheel = function(e){
	gal.velocity += Math.max(-.7, Math.min(.7, (e.wheelDelta || -e.detail))); 
}

moveHandle=function(e){
	if(mousedown)
	gal.velocity += Math.max(-.05, Math.min(.05, ( mousex- e.targetTouches[0].clientX )));
	mousex = mousex- e.targetTouches[0].clientX;
}

downHandle=function(e){
	switch(e.touches.length) {
		case 1:
			mousex = e.targetTouches[0].clientX
			mousedown = true;
		break;
		default:
		break;		
	}
}

upHandle=function(e){
	mousex=null;
	mousedown = false;
}

display.addEventListener('touchmove', moveHandle, false);
display.addEventListener('touchstart', downHandle, false);
display.addEventListener('touchend', upHandle, false);




requestAnimationFrame(loop =() =>{
	requestAnimationFrame(loop);
	update();
	renderer.render(scene,camera);});
