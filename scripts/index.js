/* global loadImage recogImage editData saveData imgSelection TesseractWorker */
window.onload = function () {
	loadImage.init();
	recogImage.init();
	editData.init();
	saveData.init();
	imgSelection.init();
	TesseractWorker.init();

	const acknowledgements = document.querySelector("#acknowledgements");
	acknowledgements.innerHTML = window.feather.icons.award.toSvg({ color: "#e2b007" });
	acknowledgements.addEventListener("click", evt => {
		window.open("./acknowledgements/third-party-licenses.html", '_blank');
	}, { passive: true });
};
