var loadImage = (function(){
    var _oCurrentImage;
    var _oFileHandler;
    var _oImageTag;
	var _bInitialLandscape;
	var _bInitialImage = true;

    function _setImageProperties () {
        _oImageTag = document.getElementById("sample");
        $('#imgSelection').draggable({ containment: "parent" });
        $('#imgSelection').resizable();
    }

    function _addLoadFile () {
        _oFileHandler = document.createElement("input")
        _oFileHandler.setAttribute('id', "FileHandler");
        _oFileHandler.setAttribute('type', 'file');
        _oFileHandler.setAttribute('accept', 'image/*');
        _oFileHandler.setAttribute('multiple', false);
        document.getElementById("hidden").appendChild(_oFileHandler);

        _oFileHandler.onchange = _handleFileSelect.bind(this);
    };

    function _handleFileSelect (oEvt) {
        const oFile = oEvt.target.files[0];
        const oReader = new FileReader();
        oReader.onload = _setImageAsBackground
        oReader.readAsDataURL(oFile);
    };

    function _setNewImageProperies ()  {
		_setInitialOrientation();
    }

    function _load () {
        _oFileHandler.click();
    }

	function _setInitialOrientation () {
		_bInitialLandscape = _oImageTag.naturalHeight < _oImageTag.naturalWidth;
	}
	
	function _setImageSize () {
		var oContainerElement = _oImageTag.parentElement;
		var size = Math.min(oContainerElement.offsetWidth, oContainerElement.offsetHeight);
		_oImageTag.style.maxHeight = size + "px";
		_oImageTag.style.maxWidth = size + "px";
	}

    return {
        init: function () {
            _addLoadFile();
			_setImageProperties();
			_setInitialOrientation();
			_setImageSize();
        },

        load: function () {
            _load();
        },

		setNewImageProperies: function () {
			if (!_bInitialImage) {
				_setNewImageProperies();
			} else {
				_bInitialImage = false;
			}
		}
    }
})()