var loadImage = (function(){
    var _oCurrentImage;
    var _oFileHandler;
    var _oImageTag;
    var _iImageAngle = 0;

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

    function _setImageAsBackground (oEvt)  {
        _oCurrentImage = oEvt.target.result;
        _oImageTag.src = _oCurrentImage;
        _iImageAngle = 0;
    }

    function _load () {
        _oFileHandler.click();
    }

    function _rotateImage () {
        _iImageAngle += 90
        _oImageTag.setAttribute('style','transform:rotate(' + _iImageAngle + 'deg)');
    }

    return {
        init: function () {
            _addLoadFile();
            _setImageProperties();
        },

        load: function () {
            _load();
        },

        rotateImage: function () {
            _rotateImage();
        }
    }
})()