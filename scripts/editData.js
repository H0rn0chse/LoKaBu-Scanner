var editData = (function () {
	"use strict";

	var _stores = [];
	var _accounts = [];
	var _persons = [];
	var _types = [];

	function _load (aArr) {
		var oResult = document.getElementById("results");
		oResult.innerHTML = "";

		var oBaseLine = document.createElement("div");

		var dateInput = document.createElement("input");
		dateInput.setAttribute("type", "date")
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

		oBaseLine.appendChild(dateInput);
		oBaseLine.appendChild(storeSelect);
		oBaseLine.appendChild(accountSelect);
		oResult.appendChild(oBaseLine);

		aArr.forEach(function (elem) {
			elem = elem.replace(/,/g, ".");
			elem = parseFloat(elem)
			var oLine = document.createElement("div");

			var checkboxInput = document.createElement("input");
			checkboxInput.setAttribute("type", "checkbox");
			checkboxInput.classList.add("checkboxInput");

			var valueInput = document.createElement("input");
			valueInput.setAttribute("type", "number");
			valueInput.setAttribute("step", "0.01");
			valueInput.value = elem;
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
			typeSelect.classList.add("typeSelect");

			oLine.appendChild(checkboxInput);
			oLine.appendChild(valueInput);
			oLine.appendChild(personSelect);
			oLine.appendChild(typeSelect);
			oResult.appendChild(oLine);
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