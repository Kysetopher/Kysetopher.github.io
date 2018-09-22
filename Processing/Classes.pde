
class Item{
	PImage display;
	String[] info, tags;
	string name, type, url;
	
	Item(String filename){
		

		info= loadStrings('Objects/' + filename + '/info.txt');
		display = requestImage('Objects/' + filename + '/display.png' );
		
		name = filename;
		type = info[0];
		url = info[1];
		
	}
	void draw(){

		image(display,-display.width/2, -display.height/2,display.width,display.height);
		translate(0,0,-5);
		//rect(-display.width/2 -6, -display.height/2-6,display.width+12,display.height+12);
		//text( type, -display.width/2, display.height/2);
	}
	void drawhover(){
		rect(-display.width/2 -6, -display.height/2-6,display.width+12,display.height+12);
		fill(255,111);
		rect(display.width/2 , -display.height/2-6,12,display.height+12);
		text( type, -display.width/2, display.height/2);
	}
	void select(){
		
	}

}
/*
class Button

{

  Button(int w, int h, int x, int y) {
    wdth = w;
    hght = h
	posX = x;
	posY = y;
	color=
  }
  void update() {
  }
  
   boolean pressed() {
    if(over) {
		
	}
   
  }
  boolean over() {
	if (mouseX >= posX && mouseX <= posX+wdth && 
      mouseY >= posY && mouseY <= posY+hght) {
      return true;
    } else {
      return false;
    }
  }

  void draw() 
  {
    stroke(255);
    if(over()){
		
    rect(posX, posY, wdth, hght);
	}
  }
}
*/