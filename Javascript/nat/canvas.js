

//------------------------------- THREE.js Handles -------------------------------------------------------
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / 500, 0.1, 1000);	
var renderer = new THREE.WebGLRenderer({ alpha: true });													   
var light = new THREE.AmbientLight( 0x404040 );											

//---------------------------- DOM Handles -----------------------------------------------------------------
renderer.setSize( window.innerWidth, 500 );
document.getElementById('gallery').appendChild(renderer.domElement);
	
const display = document.getElementsByTagName("CANVAS")[0];
const head = document.getElementsByTagName('HEAD')[0];


var cssMobile = document.createElement('LINK');
cssMobile.rel = 'stylesheet';
cssMobile.type = 'text/css';
cssMobile.href = 'CSS/mobile.css';


	
//----------------------------------------------------------------------------------------------------------------------------------------------------
//																	]-SETUP & LOOP-[
//----------------------------------------------------------------------------------------------------------------------------------------------------

var loop;

var update = function(){		//------- Update Loop
	gal.update();
	ovl.update();
	vwr.update();


}

var getJson = function() { 		//------- Get JSON file containing objects to appear in Gallery
	return $.ajax({ 
        type: "GET",
		 headers: {
		//"Access-Control-Allow-Origin": "*",
		},
        dataType: "json",
		url: "objects.json",
		async: false
    }).responseText; 

};

var setup = function(){			//-------- Load assets, setup, and add objects to the scene

	json=JSON.parse(getJson("objects.json"));
		
	
	gal = new gallery(json.Item);

	vwr = new viewer(json.Item,gal);
	ovl = new overlay(json.Item,gal,vwr);
	
	scene.add(gal.group);
	scene.add(vwr.sprite);
	scene.add(light);
	camera.position.z=20;
	
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		head.appendChild(cssMobile)
		console.log(cssMobile);
		if(screen.orientation.angle == 0){
			vwr.sprite.position.z = -50;
		} else vwr.sprite.position.x = -5;
		camera.position.z= 15;
		camera.position.y = 2;
		vwr.sprite.position.y=2;
	
	}

	
}();

//tba140668279000
requestAnimationFrame(loop =() =>{
	requestAnimationFrame(loop);
	update();
renderer.render(scene,camera);});
//----------------------------------------------------------------------------------------------------------------------------------------------------
//																	]-OPERATION-[
//----------------------------------------------------------------------------------------------------------------------------------------------------
var transition = function( crnt, next){
	crnt.disable();
	next.enable();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//																	]-OVERLAY-EVENT-LISTENERS-[
//----------------------------------------------------------------------------------------------------------------------------------------------------		
	
	document.getElementById('overlay').onclick= function(e) {
			switch(e.target.id){
				case "exit":
				gal.enable();
				vwr.disable();
				document.getElementById('exit').visible=false;
				break;
				default:
					
				break;
				
			}	
		}

document.getElementById('drop').onchange = function (e){
	for (var i = scene.children.length - 1; i >= 0; i--) {
			scene.remove(scene.children[i]);
	}
	json.Item.sort(function(a,b){
		
		
				if(a[e.target.value] == b[e.target.value])return 0;
				if(a[e.target.value] < b[e.target.value])return -1;
				if(a[e.target.value] > b[e.target.value])return 1;
	});

	gal.clear();
	gal= new gallery(json.Item);
	vwr = new viewer(json.Item,gal);
	ovl = new overlay(json.Item,gal,vwr);
	
	scene.add(gal.group);
	scene.add(vwr.sprite);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//																	]-DISPLAY-EVENT-LISTENERS-[
//----------------------------------------------------------------------------------------------------------------------------------------------------
window.onorientationchange = function(e){
	
	if(screen.orientation.angle == 0){
		vwr.sprite.position.z = -40;
		vwr.sprite.position.x = 0;

	} else {
			vwr.sprite.position.z = 0;
			vwr.sprite.position.x = -5;

	}

	
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect = window.innerWidth / window.innerHeight;
	
	camera.updateProjectionMatrix();
}

window.onresize = function(e){
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}


var mousex,mousedown,mousedragged = false;

display.onclick = function(e) {
	
	if(mousedragged){
		mousedragged=false;
	} else {

		if ( ((window.innerWidth * 0.6) > e.clientX && e.clientX  > (window.innerWidth * 0.4)) && ((window.innerHeight * 0.6 ) > e.clientY && e.clientY > ( window.innerHeight * 0.4 ) )  ){
			if( 0.2 > gal.index - Math.round(gal.index) > -0.2){
				switch(gal.objects[Math.round(gal.index)].type){
					case "Image":
						transition(gal, vwr);
						document.getElementById('exit').visible=true;
						break;
					default:
						console.log("No Type of Selected Object" + this.objects[Math.round(this.index)].type);
						break;
				
				}
			}
		}
	
	}
} 


display.onmousedown  = function(e){
	mousex = e.clientX;
	mousedown = true;
	gal.enabled = false;
}

display.onmouseup = function(e){
	mousex=null;
	mousedown = false;
	gal.enabled = true;
}

display.onmousemove = function(e){
	if(mousedown){
		mousedragged=true;
		gal.velocity += Math.max(-.05, Math.min(.05, ( mousex- e.clientX )));
	}
	if ( ((window.innerWidth * 0.6) > e.clientX && e.clientX  > (window.innerWidth * 0.4)) && ((window.innerHeight * 0.6 ) > e.clientY && e.clientY > ( window.innerHeight * 0.4 ) )  ){
			gal.hovering= true;
			
	} else  gal.hovering= false;
	mousex = e.clientX;
}

display.onwheel = function(e){
	e.preventDefault();
	gal.velocity += Math.max(-.7, Math.min(.7, (e.wheelDelta || -e.detail))); 
}

 moveHandle=function(e){
	if(mousedown)
	gal.velocity += Math.max(-.05, Math.min(.05, ( mousex- e.targetTouches[0].clientX )));
	mousex = e.targetTouches[0].clientX;
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





