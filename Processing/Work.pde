
class Slider{
	
	boolean enbld;
	float index,velocity,center,cursor,focus;
	int wdth,hght,posX,posY,limit;
	
	Slider(int x ,int y, int w,int h) { 

		wdth = w;
		hght = h;
		posX= x;
		posY = y;
		
		enbld = true;
		index = 0;
		velocity = 0;
		limit = 0;
		
	} 
  
	void draw() {
		UpdateVar();
		pushMatrix();
		translate(posX,posY,-200);

		for (int i = 0; i < limit; i++) {   iterate(i);  }
		//for (int i = 0; i < index; i++) {   iterate(i);  }
		//for (int i = limit-1; i >= index; i--) {   iterate(i);  }
		popMatrix();
	}

  void iterate(int i){

		focus = gaus(i - cursor,0,1/8);
		center = gaus(i-index,0,1);
		
		stroke((focus+center) *100);
		tint(255,127);
		fill(255,127);
		
      pushMatrix(); 
       translate( cbrt(i-index)*(wdth)*(3/4) + focus*(i-index)*4, 0 ,  center*(wdth)*2 + focus * (wdth/8) );
    
        pushMatrix();		//rotation matrix for individual items 
			rotateY( cbrt(i-index)/2 *PI);
			items[i].draw();
			
			//if( abs(focus)> 0.5)items[i].drawhover();
        popMatrix();
      popMatrix();

  }
	
	void UpdateVar(){
    cursor = pow((float)(mouseX - width/2)/ (wdth/2),3)/6 + index ;								// cursor is relational to index

	index+=velocity;
	velocity *=.5;
	velocity += (round(index)- index)*.05;
	
	if(index > limit-1) velocity -= (index +1 -  limit)*.1;
	if(index < 0) velocity -= index*.1;

	}

	void mousePressed(){
    if(cursor<limit-1 && cursor>-1) velocity +=(cursor-index)/2;
	}
	
	void mouseDragged(){ 
	velocity *=.001;
	index+= (lastX-mouseX)/wdth;
	}
	
	void mouseReleased(){
	velocity = (lastX - mouseX);
	}
	
	void cbrt(float x){
		if (x==0) return 0;
		else if (x>0) return pow(x,1/3);
		else return -pow(abs(x), 1/3);
	}
	
	void gaus(float x, float mean, float variance){
		return(1 / sqrt(TWO_PI * variance)) * exp(-sq(x- mean) / (2* variance));
	}
}
