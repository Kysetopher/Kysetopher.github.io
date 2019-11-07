
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.AmbientLight( 0x404040 );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const display = document.getElementsByTagName("CANVAS")[0];
display.onwheel = mouseWheel;

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

function mouseWheel(e){

	gal.velocity += Math.max(-.7, Math.min(.7, (e.wheelDelta || -e.detail))); 

}



requestAnimationFrame(loop =() =>{
	requestAnimationFrame(loop);
	update();
	renderer.render(scene,camera);});
