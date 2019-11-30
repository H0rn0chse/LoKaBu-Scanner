var saveData = (function () {
	"use strict";

	function _noInvalid() {
		var oResult = document.getElementById("results");
		return !oResult.querySelectorAll(".invalidInput").length > 0;
	}

	function _getFileName () {
		var iTimestamp = Date.now();
		var sFilename = loadImage.getFileName();
		return sFilename + "_" + iTimestamp + ".fragment.xml";
	}

	function _collectData () {
		function _addTag(sValue, sTag) {
			return "<"+ sTag + ">" + sValue + "</"+ sTag + ">"
		}
		var sStr = "";
		var oResult = document.getElementById("results");
		var sDate = oResult.querySelectorAll(".baseLine .dateInput")[0].value
		var sStore = oResult.querySelectorAll(".baseLine .storeSelect")[0].value
		var sSourceAccount = oResult.querySelectorAll(".baseLine .accountSelect")[0].value

		var aLines = oResult.querySelectorAll(".line");
		aLines.forEach(function (oLine) {
			var sValue = oLine.querySelectorAll(".valueInput")[0].value.replace(/,/g, "").replace(/^0+/, '');
			var sPerson = oLine.querySelectorAll(".personSelect")[0].value;
			var sTargetAccount = (oLine.querySelectorAll(".accountSelect:not(.hideElement)")[0] || {}).value || "";
			var sType = oLine.querySelectorAll(".typeSelect")[0].value;

			var sTemp = _addTag(sDate, "Date");
			sTemp += _addTag(sStore, "Store");
			sTemp += _addTag(sSourceAccount, "SourceAccount");
			sTemp += _addTag(sTargetAccount, "TargetAccount");
			sTemp += _addTag(sValue, "Value");
			sTemp += _addTag(sPerson, "Person");
			sTemp += _addTag(sType, "Type");

			sStr += _addTag( sTemp, "Line") + "\n";
		});
		return sStr;
	}

	function _save(sFileName, sText) {
		const oTemp = document.createElement('a');
		oTemp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sText));
		oTemp.setAttribute('download', sFileName);
		oTemp.click();
	};

	return {
		init: function () {

		},

		submit: function () {
			if (_noInvalid()) {
				_save(_getFileName(), _collectData());
			} else {
				alert ("There are some invalid inputs!");
			}
		}
	};
})();