

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loop;

var update = function(){

}
var setup = function(){
	
}();

requestAnimationFrame(loop =() =>{
	requestAnimationFrame(loop);
	update();
	renderer.render(scene,camera);});
