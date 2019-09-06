class object{

	constructor( name , material){
		this.name = name;
		this.group = new THREE.Group();
		
		this.geometry= new THREE.BoxGeometry( 10,15,.5);
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.group.matrixAutoUpdate= false;
		
		this.group.add(this.mesh);
	}

}