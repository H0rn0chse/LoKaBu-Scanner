var recogImage = (function () {

	function _progressCallback (p) {
		console.log(p);
	}

	function _finallyCallback (obj){
		console.log(obj);
	}

	function _copyAndCutImage () {
		var sourceImage = document.getElementById("sample");
		var imgSelection = document.getElementById("imgSelection");
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext('2d');

		//Reset canvas
		canvas.height = canvas.width = 0;
		
		//get Rectangle
		var imgBox = sourceImage.getBoundingClientRect();
		var selBox = imgSelection.getBoundingClientRect();
		
		var imgAngle = 0;
		var sizeFactor;
		if (imgAngle == 0 || imgAngle == 180) {
			sizeFactor = sourceImage.naturalHeight / imgBox.height;
		} else {
			sizeFactor = sourceImage.naturalHeight / imgBox.width;
		}
		var sourceX = 0;
		var sourceY = 0;
		var targetWidth = 0;
		var targetHeight = 0;
		var translateX = 0;
		var translateY = 0;

		// => intersect
		if (Math.max(imgBox.left, selBox.left) < Math.min(imgBox.right, selBox.right) && Math.max(imgBox.top, selBox.top) < Math.min(imgBox.bottom, selBox.bottom)) {
			//=> left selection in image
			sourceX = selBox.x > imgBox.x && selBox.x < imgBox.x + imgBox.width ? selBox.x - imgBox.x : 0;
			//=> top selection in image
			sourceY = selBox.y > imgBox.y && selBox.y < imgBox.y + imgBox.height ? selBox.y - imgBox.y : 0;

			//=> selection width fits into image
			if (selBox.x + selBox.width < imgBox.x + imgBox.width) {
				targetWidth = selBox.width;
			}/*else if() {
				targetWidth = 
			}*/

			//=> selection width fits into image
			if (selBox.y + selBox.height < imgBox.y + imgBox.height) {
				targetHeight = selBox.height;
			}
		}
		//console.log(imgBox);
		//console.log(selBox);
		//console.log({sourceX: sourceX, sourceY: sourceY, targetWidth: targetWidth, targetHeight: targetHeight})

		//Copy img to canvas
		var temp;
		switch (imgAngle) {
			case 90:
				temp = sourceX;
				sourceX = sourceY;
				sourceY = imgBox.width - (temp + targetWidth);
				temp = targetHeight;
				targetHeight = targetWidth;
				targetWidth = temp;
				translateX = targetWidth;
				translateY = 0;
				break;
			case 180:
				break;
			case 270:
					break;
		}
		canvas.width = targetWidth;
		canvas.height = targetHeight;
		context.save();
		context.translate(translateX, translateY);
		context.rotate(imgAngle * Math.PI / 180)
		context.drawImage(sourceImage, sourceX * sizeFactor, sourceY * sizeFactor, targetWidth * sizeFactor, targetHeight * sizeFactor, 0, 0, canvas.width, canvas.height);
		context.restore()
	}

	function _start () {
		var img = _copyAndCutImage();
		//TesseractWorker.loadImage(img, _progressCallback, _finallyCallback);
	}

	return {
		init: function () {

		},
		start: function () {
			_start();
		}
	}
})();
