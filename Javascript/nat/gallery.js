class gallery{
	
	constructor(items){
		this.group = new THREE.Group();
		this.objects = [items.length];
		for(var i = 0 ; i < items.length; i++){
			
			this.objects[i]= new object( items[i]);
			this.group.add(this.objects[i].group);
		}

		this.index=0;
		this.velocity=0;
	}

	
	update(){
			this.index += this.velocity;
			this.velocity*=0.05;
			this.velocity += (Math.round(this.index)- this.index)*0.05;
		
			if(this.index > this.objects.length-1) this.velocity -= (this.index +1 -  this.objects.length)*.1;
			if(this.index < 0) this.velocity -= this.index*.1;

			for(var i = 0 ; i < this.objects.length; i++){

				this.objects[i].group.matrix.compose(
				new THREE.Vector3(Math.cbrt( i - this.index)*10,0,gaus(i-this.index,0,.7)*20), 
				new THREE.Quaternion(0,0,0,0),
				new THREE.Vector3(1,1,1));
				
				this.objects[i].mesh.setRotationFromAxisAngle(new THREE.Vector3(0,1,0),Math.cbrt(i-this.index)/2 *Math.PI);
				//this.objects[i].mesh.matrix.setPosition(new THREE.Vector3(Math.cbrt( i - this.index),0,0));
				this.objects[i].material.opacity =  gaus(i-this.index,0,4)*6;
			}
		}
				
}
const gaus= function(x, mean, variance){
	return(1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x- mean,2) / (2* variance));
}