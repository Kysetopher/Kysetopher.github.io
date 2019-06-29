class element{

	var name, url;
	var[] tags, description;
	var geometry, mesh;
	
	constructor( name , material){
		this.name = name;
		
		geometry= new THREE.BoxGeometry( 10,15,.5);
		mesh = new THREE.mesh(geometry, material);
	}

}