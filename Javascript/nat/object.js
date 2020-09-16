

class object{

	constructor( item){

		
		this.texture = new THREE.TextureLoader().load( item.texture);
		this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
		this.material.transparent = true;
		this.geometry= new THREE.BoxGeometry( item.DWidth,item.DHeight,.1);
		this.mesh = new THREE.Mesh(this.geometry, this.material);


		this.group = new THREE.Group();
		this.group.matrixAutoUpdate= false;
		this.group.add(this.mesh);
		
		this.type = item.type;
		this.path = item.path;
		
	}

}