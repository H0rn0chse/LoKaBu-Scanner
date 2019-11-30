var imgSelection = (function () {
	var _bMouseDown = false;
	var _oInitialTopLeftPosition = {
		x:0,
		y:0
	};

	function _initHandler () {
		var oImage = document.getElementById("sample");
		oImage.ondragstart = function(oEvt) { oEvt.preventDefault();}
		oImage.ondrag = function(oEvt) { oEvt.preventDefault();}

		document.onmousedown = function (oEvt) {
			var oSelection = document.getElementById("imgSelection");

			if (oEvt.path.includes(oImage) || oEvt.path.includes(oSelection)) {
				_bMouseDown = true;
				
				oSelection.style.left = oEvt.clientX + "px";
				_oInitialTopLeftPosition.x = oEvt.clientX;
				oSelection.style.top = oEvt.clientY + "px";
				_oInitialTopLeftPosition.y = oEvt.clientY;
				oSelection.style.width = "0px";
				oSelection.style.height = "0px";
			}
		}
		document.onmousemove = function (oEvt) {
			var oSelection = document.getElementById("imgSelection");

			if (_bMouseDown && (oEvt.path.includes(oImage) || oEvt.path.includes(oSelection))) {
				var iWidth = oEvt.clientX - _oInitialTopLeftPosition.x;
				var iHeight = oEvt.clientY - _oInitialTopLeftPosition.y;
				if (iWidth < 0) {
					oSelection.style.left = oEvt.clientX + "px";
				}
				if (iHeight < 0) {
					oSelection.style.top = oEvt.clientY + "px";
				}
				oSelection.style.width = Math.abs(iWidth) + "px";
				oSelection.style.height = Math.abs(iHeight) + "px";
			}
		}
		document.onmouseup = function (oEvt) {
			_bMouseDown = false;
		}
	}
	return {
		init: function () {
			_initHandler();
		}
	};
})();