	
/* @pjs transparent="true"; */
Slider stack;
Navigator nvgtr;
PImage img;
float lastX,lastY;

void setup(){
	loadTextures();
	size(screen.width,screen.height,P3D);
	img = loadImage("Assets/Wall.png");
	stack = new Slider(width/2,height/2, width/4,height/1.5);
}

void draw(){

	background(100);
	
	pushMatrix();
	if(stack.enbld)stack.draw();
	popMatrix();

}

void mousePressed(){
	stack.mousePressed();
}

void mouseReleased(){
}
void mouseMoved(){
	lastX = mouseX;
	lastY = mouseY;
}
void mouseDragged(){
	lastX = mouseX;
	lastY = mouseY;
}
void mouseWheel(int delta){
	stack.velocity += delta/2;
}
/*
void console(){
	textSize(32);
	text(stack.limit,500,30);
	text(stack.hght,500,60);
}
*/


