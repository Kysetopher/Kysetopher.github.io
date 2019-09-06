
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const display = document.getElementsByTagName("CANVAS")[0];
display.onwheel = mouseWheel;

var loop;
var json;

var update = function(){
	gal.update();
}

$.getJSON("objects.json", (data) => {
	$.each(data, (index, value) => {
		json = value;
	});
});	

var setup = function(){
	gal = new gallery(10,new THREE.Material());
	scene.add(gal.group);
	camera.position.z=20;
}();

function mouseWheel(e){

	gal.velocity += Math.max(-.5, Math.min(.5, (e.wheelDelta || -e.detail))); 

}



requestAnimationFrame(loop =() =>{
	requestAnimationFrame(loop);
	update();
	renderer.render(scene,camera);});
