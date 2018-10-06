	
/* @pjs transparent="true"; */
Slider stack;
Navigator nvgtr;
PImage img;
float lastX,lastY;
Button[] buttons;

void setup(){
	loadTextures();
	buttons = new Button[3];
	size(screen.width,screen.height,P3D);
	img = loadImage("Assets/Wall.png");
	stack = new Slider(width/2,height/2, width/4,height/1.5);

	buttons[0]= new Button(200,200, width/4, 200,"test","url");
}

void draw(){

	background(100);
	pushMatrix();
	if(stack.enbld)stack.draw();
	popMatrix();
	//buttons[0].draw();

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
/*
void console(){
	textSize(32);
	text(stack.limit,500,30);
	text(stack.hght,500,60);
}
*/


