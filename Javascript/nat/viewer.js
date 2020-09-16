

class viewer{

	constructor( items, gal ){
		this.items = items
		this.materials = [items.length];
		this.gallery = gal;
		
		this.sprite = new THREE.Sprite();
		this.sprite.scale.set(window.innerWidth/50, window.innerHeight/50 ,1);
		this.sprite.visible=false;
		


		var texture;
		for(var i = 0 ; i < items.length; i++){
			this.texture = new THREE.TextureLoader().load( items[i].path);

		
			this.materials[i] = new THREE.SpriteMaterial( { map: this.texture } );
			this.materials[i].name = items[i].name;

			}
		}
		
	clear(){
		
	}		
	update(){
		if(this.sprite.visible){
			this.sprite.material = this.materials[Math.round(this.gallery.index)] ;
			this.sprite.scale.set( window.innerHeight/50 * this.items[Math.round(this.gallery.index)].DWidth / this.items[Math.round(this.gallery.index)].DHeight , window.innerHeight/50 , 1);
			
		}
	}
	
	enable(){this.sprite.visible=true;}
	disable(){this.sprite.visible=false;}
	

}