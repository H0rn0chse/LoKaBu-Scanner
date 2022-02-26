/* global FileReader */
var loadImage = (function () { // eslint-disable-line no-unused-vars
	var _oFileHandler;
	var _oImageTag;
	var _iImageAngle = 0; // 270;
	var _bInitialLandscape;
	var _bInitialImage = true;
	var _sFileName = "default.png";

	function _setImageProperties () {
		_oImageTag = document.getElementById("sample");
	}

	function _addLoadFile () {
		_oFileHandler = document.createElement("input");
		_oFileHandler.setAttribute('id', "FileHandler");
		_oFileHandler.setAttribute('type', 'file');
		_oFileHandler.setAttribute('accept', 'image/*');
		_oFileHandler.setAttribute('multiple', false);
		document.getElementById("hidden").appendChild(_oFileHandler);

		_oFileHandler.onchange = _handleFileSelect.bind(this);
	}

	function _handleFileSelect (oEvt) {
		const oFile = oEvt.target.files[0];
		if (oFile) {
			_sFileName = oFile.name;
			const oReader = new FileReader();
			oReader.onload = function (oEvt) {
				_oImageTag.src = oEvt.target.result;
			};
			oReader.readAsDataURL(oFile);
		}
	}

	function _setNewImageProperies () {
		// _iImageAngle = 270;
		_setInitialOrientation();
		_rotateImage();
	}

	function _load () {
		_oFileHandler.click();
	}

	function _rotateImage () {
		/* _iImageAngle += 90
		_iImageAngle = _iImageAngle % 360
		var iOffset = Math.abs(_oImageTag.offsetWidth - _oImageTag.offsetHeight) / 2;
		_oImageTag.setAttribute('style','transform:rotate(' + _iImageAngle + 'deg)');

		if (_bInitialLandscape) {
			_oImageTag.style.top = iOffset + "px";
		} else {
			_oImageTag.style.left = iOffset + "px";
		} */
	}

	function _setInitialOrientation () {
		_bInitialLandscape = _oImageTag.naturalHeight < _oImageTag.naturalWidth;
		console.log(_bInitialLandscape);
	}

	function _setImageSize () {
		var oContainerElement = _oImageTag.parentElement;
		var size = Math.min(oContainerElement.offsetWidth, oContainerElement.offsetHeight) - 50;
		_oImageTag.style.maxHeight = size + "px";
		_oImageTag.style.maxWidth = size + "px";
	}

	return {
		init: function () {
			_addLoadFile();
			_setImageProperties();
			_setInitialOrientation();
			_setImageSize();
			_rotateImage();
		},

		load: function () {
			_load();
		},

		rotateImage: function () {
			_rotateImage();
		},

		getRotation: function () {
			return _iImageAngle;
		},

		setNewImageProperies: function () {
			if (!_bInitialImage) {
				_setNewImageProperies();
			} else {
				_bInitialImage = false;
			}
		},

		getFileName: function () {
			return _sFileName;
		}
	};
})();
