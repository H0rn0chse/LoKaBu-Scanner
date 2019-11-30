var editData = (function () {
	"use strict";

	var _stores = [];
	var _accounts = [];
	var _persons = [];
	var _types = [];

	function _load (aArr) {
		var oResult = document.getElementById("results");
		oResult.innerHTML = "";

		var oUpperBaseLine = document.createElement("div");
		oUpperBaseLine.classList.add("upperBaseLine");

		var exportButton = document.createElement("button");
		exportButton.innerText = "Export";
		exportButton.onclick = saveData.submit;

		var selectAllButton = document.createElement("button");
		selectAllButton.innerText = "Select All";
		selectAllButton.onclick = _selectAll;

		var selectNoneButton = document.createElement("button");
		selectNoneButton.innerText = "Unselect All";
		selectNoneButton.onclick = _selectNone;

		var setTypeButton = document.createElement("button");
		setTypeButton.innerText = "Set Type";
		setTypeButton.onclick = _setType;

		var outerTypeSelect = document.createElement("select");
		_types.forEach(function (type) {
			var oOption = document.createElement("option");
			oOption.text = type;
			oOption.value = type;
			outerTypeSelect.appendChild(oOption);
		});
		outerTypeSelect.classList.add("outerTypeSelect");

		var setPersonButton = document.createElement("button");
		setPersonButton.innerText = "Set Person";
		setPersonButton.onclick = _setPerson;

		var outerPersonSelect = document.createElement("select");
		_persons.forEach(function (person) {
			var oOption = document.createElement("option");
			oOption.text = person;
			oOption.value = person;
			outerPersonSelect.appendChild(oOption);
		});
		outerPersonSelect.classList.add("outerPersonSelect");

		var addLineButton = document.createElement("button");
		addLineButton.innerText = "Add Line";
		addLineButton.onclick = function () {
			_addLine(0)
		};

		var deleteLineButton = document.createElement("button");
		deleteLineButton.innerText = "Delete Line";
		deleteLineButton.onclick = _deleteLine

		oUpperBaseLine.appendChild(exportButton);
		oUpperBaseLine.appendChild(selectAllButton);
		oUpperBaseLine.appendChild(selectNoneButton);
		oUpperBaseLine.appendChild(setTypeButton);
		oUpperBaseLine.appendChild(outerTypeSelect);
		oUpperBaseLine.appendChild(setPersonButton);
		oUpperBaseLine.appendChild(outerPersonSelect);
		oUpperBaseLine.appendChild(addLineButton);
		oUpperBaseLine.appendChild(deleteLineButton);
		oResult.appendChild(oUpperBaseLine);

		var oBaseLine = document.createElement("div");
		oBaseLine.classList.add("baseLine");

		var dateInput = document.createElement("input");
		dateInput.setAttribute("type", "date")
		dateInput.valueAsDate = new Date();
		dateInput.classList.add("dateInput");

		var storeSelect = document.createElement("select");
		_stores.forEach(function (store) {
			var oOption = document.createElement("option");
			oOption.text = store;
			oOption.value = store;
			storeSelect.appendChild(oOption);
		});
		storeSelect.classList.add("storeSelect");

		var accountSelect = document.createElement("select");
		_accounts.forEach(function (account) {
			var oOption = document.createElement("option");
			oOption.text = account;
			oOption.value = account;
			accountSelect.appendChild(oOption);
		});
		accountSelect.classList.add("accountSelect");

		oBaseLine.appendChild(_newLabel("Date:"));
		oBaseLine.appendChild(dateInput);
		oBaseLine.appendChild(_newLabel("Store:"));
		oBaseLine.appendChild(storeSelect);
		oBaseLine.appendChild(_newLabel("Account:"));
		oBaseLine.appendChild(accountSelect);
		oResult.appendChild(oBaseLine);

		aArr.forEach(function (elem) {
			elem = elem.replace(/,/g, ".");
			elem = parseFloat(elem)

			_addLine(elem)
		});
	};

	function _selectAll () {
		var aCheckboxes = document.querySelectorAll('input[type="checkbox"]');
		aCheckboxes.forEach(function (item) {
			item.checked = true;
		});
	};

	function _selectNone () {
		var aCheckboxes = document.querySelectorAll('input[type="checkbox"]');
		aCheckboxes.forEach(function (item) {
			item.checked = false;
		});
	};

	function _setType () {
		var sSelectedIndex = document.querySelector(".outerTypeSelect").selectedIndex;
		var aCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
		aCheckboxes.forEach(function (box) {
			var oSelect = box.parentElement.querySelector(".typeSelect");
			oSelect.selectedIndex = sSelectedIndex;
		});
	};

	function _setPerson () {
		var sSelectedIndex = document.querySelector(".outerPersonSelect").selectedIndex;
		var aCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
		aCheckboxes.forEach(function (box) {
			var oSelect = box.parentElement.querySelector(".personSelect");
			oSelect.selectedIndex = sSelectedIndex;
		});
	};

	function _newLabel(sText, bHide) {
		var oSpan = document.createElement("span");
		oSpan.innerText = sText;
		if (bHide) {
			oSpan.classList.add("hideElement");
		}
		return oSpan;
	}

	function _addLine (fValue) {
		var oResult = document.getElementById("results");
		var oLine = document.createElement("div");
		oLine.classList.add("line");

		var checkboxInput = document.createElement("input");
		checkboxInput.setAttribute("type", "checkbox");
		checkboxInput.classList.add("checkboxInput");

		var valueInput = document.createElement("input");
		valueInput.setAttribute("type", "number");
		valueInput.setAttribute("step", "0.01");
		valueInput.value = fValue;
		valueInput.classList.add("valueInput");

		var personSelect = document.createElement("select");
		_persons.forEach(function (person) {
			var oOption = document.createElement("option");
			oOption.text = person;
			oOption.value = person;
			personSelect.appendChild(oOption);
		});
		personSelect.classList.add("personSelect");

		var typeSelect = document.createElement("select");
		_types.forEach(function (type) {
			var oOption = document.createElement("option");
			oOption.text = type;
			oOption.value = type;
			typeSelect.appendChild(oOption);
		});
		typeSelect.onchange = function (oEvt) {
			console.log("hi")
			switch(oEvt.target.value) {
				case "Transfer":
					oEvt.target.parentElement.querySelector(".accountSelect").classList.remove("hideElement");
					oEvt.target.parentElement.querySelector("span:last-of-type").classList.remove("hideElement");
					break;
				default:
					oEvt.target.parentElement.querySelector(".accountSelect").classList.add("hideElement");
					oEvt.target.parentElement.querySelector("span:last-of-type").classList.add("hideElement");
			}
		}
		typeSelect.classList.add("typeSelect");

		var accountSelect = document.createElement("select");
		_accounts.forEach(function (account) {
			var oOption = document.createElement("option");
			oOption.text = account;
			oOption.value = account;
			accountSelect.appendChild(oOption);
		});
		accountSelect.classList.add("accountSelect");
		accountSelect.classList.add("hideElement");

		oLine.appendChild(checkboxInput);
		oLine.appendChild(valueInput);
		oLine.appendChild(_newLabel("Person:"));
		oLine.appendChild(personSelect);
		oLine.appendChild(_newLabel("Type:"));
		oLine.appendChild(typeSelect);
		oLine.appendChild(_newLabel("Account:", true));
		oLine.appendChild(accountSelect);
		oResult.appendChild(oLine);
	};

	function _deleteLine () {
		var aCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
		aCheckboxes.forEach(function (box) {
			var oParent = box.parentElement;
			oParent.parentElement.removeChild(oParent);
		});
	};

	return {
		init: function () {
			_stores = [
				"Unbekannt",
				"Aldi",
				"Edeka",
				"Lidl",
				"Saturn",
				"Galeria",
				"Rossmann",
				"Kaufland",
				"Rewe",
				"Müller",
				"Go Asia",
				"Netto",
				"TK Maxx",
				"DM",
				"Amazon"
			]
			_accounts = [
				"Aaron_Bar",
				"Aaron_Konto",
				"Julia_Bar",
				"Julia_Konto",
				"Gem_Bar"
			];
			_persons = [
				"Gemeinsam",
				"Aaron",
				"Julia"
			];
			_types = [
				"Nahrung",
				"Nerdkram",
				"Bekleidung",
				"Hygiene",
				"Technik",
				"Büro",
				"Fahrtkosten",
				"Haushalt",
				"Einnahmen",
				"Anschaffung",
				"Abonnement",
				"Vertrag",
				"Ausgehen",
				"Geschenk",
				"Transfer",
				"Auto",
				"Katze"
			];
		},

		load: function (aArr) {
			_load(aArr);
		}
	}
})();