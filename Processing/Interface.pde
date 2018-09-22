

interface JavaScript {
	void mouseWheel( int delta);
	void loadObjects(string[] paths);
}
void bindJavascript(JavaScript js){
	javascript = js;
}

JavaScript javascript;