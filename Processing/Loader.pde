




Item[] items;
PImage[] textures;

void loadObjects(string[] paths){
	
	items = new Item[paths.length];
	
	for (int i = 0; i < paths.length; i++){
		items[i] = new Item(paths[i]);
	}
	stack.limit = paths.length;
}

void loadTextures(){
	textures = new PImage[6];
	for (int i= 0; i < 6 ; i++){
		textures[i] = requestImage("Assets/A" + str(i) + ".png");
	}
}

