	
/* @pjs transparent="true"; */

Slider stack;

PImage img1,img2;
float lastX,lastY;


void setup(){
	loadTextures();
	buttons = new Button[3];
	size(screen.width,screen.height,P3D);

	stack = new Slider(width/2,height/2, width/4,height/1.5);


}

void draw(){

	background(0,0);

	pushMatrix();
	if(stack.enbld)stack.draw();
	popMatrix();


}

void mousePressed(){
	stack.mousePressed();
}

void mouseReleased(){
	stack.mouseReleased();
}
void mouseMoved(){
	lastX = mouseX;
	lastY = mouseY;
}
void mouseDragged(){
	stack.mouseDragged();
	lastX = mouseX;
	lastY = mouseY;

}
void mouseWheel(int delta){
	stack.velocity += delta/2;
}


