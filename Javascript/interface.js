
			var sketch = false;
			var json;
			
			$.getJSON("objects.json", (data) => {
				$.each(data, (index, value) => {
				json = value;
				});
			});	
			
			(function bindSketch(){
				sketch = Processing.getInstanceById('sketch');
				if(!sketch) setTimeout(bindSketch,250);
				else{ 
				sketch.loadObjects(json);
				sketch.options.isTransparent = true;
				sketch.externals.sketch.options.isTransparent = true;
					alert(json);
				}
			}());
			
			var getJson = function(path) {
				$.getJSON(path, (data) => {
					$.each(data, (index, value) => {
					json = value;
					});
				});	
				return json;
			};
			
			function MouseWheelHandler(e){
					var e = window.event || e;
					var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); 
					
					sketch.mouseWheel(delta);
			}

			var display = document.getElementById("sketch");
			
			if (display.addEventListener) {
				display.addEventListener("mousewheel", MouseWheelHandler, false);
				display.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
				display.addEventListener("keydown",KeyHandler, false);
			}
			else display.attachEvent("onmousewheel", MouseWheelHandler);
		