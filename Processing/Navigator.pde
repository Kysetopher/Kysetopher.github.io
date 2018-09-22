

class Navigator{

	float index,velocity,dsplcmnt,cursor;
	int wdth,hght,posX,posY;
	Panel[] buttons;
	String[] labels;
	
	Navigator(int x ,int y, int w,int h) { 

		wdth = w;
		hght = h;
		posX = x;
		posY = y;

		index = 0;
		velocity = 0;
		
		buttons = new Panel[3];
		labels = {"Bio","Work","Contact");
		for (int i=0;i<buttons.length;i++){
			buttons[i] = new Panel(textures[2],labels[i],0,y + 100 * i, w, 100);
		}
		
	} 
	
	void draw() {
	UpdateVar();
	image(textures[5],0,posY + index*100,wdth,100);

	for (int i = 0; i < buttons.length; i++) buttons[i].draw();
	
	}
	void UpdateVar(){
	index+=velocity;
	velocity *=.5;
	velocity += (round(index)- index)*.01;
	tint(250,100,150,300);
	}
	
	void mouseWheel(int delta){
		if(index- delta/2 < buttons.length-1 && index- delta/2 > 0) 
			velocity -= delta/2;
	}
	
	void mousePressed(){
		
	}
	

}
