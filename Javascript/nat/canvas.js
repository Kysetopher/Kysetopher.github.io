

//------------------------------- THREE.js Handles -------------------------------------------------------
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(25, window.innerWidth / 400, 0.1, 1000);	
var renderer = new THREE.WebGLRenderer({alpha:true});													   
var light = new THREE.AmbientLight( 0x404040 );											

//---------------------------- DOM Handles -----------------------------------------------------------------
renderer.setSize( window.innerWidth, 400 );
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
	ovl = new overlay(json.Item, gal );
	
	scene.add(gal.group);
	scene.add(light);
	camera.position.z=20;
	
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		head.appendChild(cssMobile)
		console.log(cssMobile);
	
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
				document.getElementById('exit').visible=false;
				break;
				default:
					
				break;
				
			}	
		}

		function toggleDropdown() {
			document.querySelector(".dropdown-options").classList.toggle("show-dropdown");
		  }
		  
		  // Function to handle the selection of an option
		  function selectOption(element) {
			// Get the selected value and its associated ID
			const value = element.getAttribute("data-id");
			
			// Update the selected display text
			document.querySelector(".selected-option").textContent  = "Sort By : " + element.textContent ;
		  
			// Hide the dropdown options
			document.querySelector(".dropdown-options").classList.remove("show-dropdown");
		  
			// Call the sorting logic with the selected value
			handleSortChange(value);
		  }
		  
		  // Function to handle sorting logic based on the selected value
		  function handleSortChange(selectedValue) {
			// The previous logic for handling sorting
			for (let i = scene.children.length - 1; i >= 0; i--) {
			  scene.remove(scene.children[i]);
			}
		  
			json.Item.sort(function(a, b) {
			  if (a[selectedValue] == b[selectedValue]) return 0;
			  if (a[selectedValue] < b[selectedValue]) return -1;
			  if (a[selectedValue] > b[selectedValue]) return 1;
			});
		  
			gal.clear();
			gal = new gallery(json.Item);
			ovl = new overlay(json.Item, gal);
		  
			scene.add(gal.group);
		  }
//----------------------------------------------------------------------------------------------------------------------------------------------------
//																	]-DISPLAY-EVENT-LISTENERS-[
//----------------------------------------------------------------------------------------------------------------------------------------------------
window.onorientationchange = function(e){

	
	renderer.setSize( window.innerWidth, 400 );
		camera.aspect = window.innerWidth / 400;
	
	camera.updateProjectionMatrix();
}

window.onresize = function(e){
	renderer.setSize( window.innerWidth, 400 );
	camera.aspect = window.innerWidth / 400;
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





