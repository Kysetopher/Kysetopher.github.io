
class overlay{
	constructor(items,gal){
		this.element = document.getElementById('overlay');
		this.items = items;
		this.gallery = gal;
	}
	update(){
		var opacity = Math.abs(Math.round(this.gallery.index) - this.gallery.index);
		
		this.element.style.opacity = .9 - (opacity*10);
		this.element.style.filter  = 'alpha(opacity=90)'
		
		if(this.items[Math.round(this.gallery.index)]){
			$("#name").text(this.items[Math.round(this.gallery.index)].name 
						+ ", " + this.items[Math.round(this.gallery.index)].date );
						
			$("#medium").text(this.items[Math.round(this.gallery.index)].medium 
						+ ", " + this.items[Math.round(this.gallery.index)].width 
						+ " x " + this.items[Math.round(this.gallery.index)].height
						+ " " + this.items[Math.round(this.gallery.index)].unit );
						
			$("#description").text(this.items[Math.round(this.gallery.index)].about );				
						
		}
	}
	
	
	
}