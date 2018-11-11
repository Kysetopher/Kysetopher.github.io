
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
		
	}
	void drawhover(){
		rect(-display.width/2 -6, -display.height/2-6,display.width+12,display.height+12);
		fill(255,111);
		rect(display.width/2 , -display.height/2-6,12,display.height+12);
		text( type, -display.width/2, display.height/2);
	}


}

class Button{
	int wdth,hght,posX,posY;
	String label, URL;
	PImage display;

  Button(int w, int h, int x, int y,String l, String u) {
    wdth = w;
    hght = h;
	posX = x;
	posY = y;
	label = l;
	URL = u;
	

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
	  pushMatrix();
	//rotateY(90);
	
    stroke(255);
    if(over()){
		stroke(0);
	}
	rect(posX, posY, wdth, hght);
	fill(0);

	textSize(100);
	translate(0,0,0);
	text(label, posX+ wdth/4,posY+hght/2);
	popMatrix();
  }
}


class Link{
	int wdth,hght,posX,posY;
	String URL;
	PImage display;

  Link(int w, int h, int x, int y, String u) {
    wdth = w;
    hght = h;
	posX = x;
	posY = y;
	URL = u;
	

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
	  pushMatrix();
	//rotateY(90);
	
    stroke(255);
    if(over()){
		stroke(0);
	}
	rect(posX, posY, wdth, hght);
	fill(0);


	popMatrix();
  }
}
