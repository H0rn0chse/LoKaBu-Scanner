var TesseractWorker = (function (tesseractWorker) {

	const langs = "deu";
    const { createWorker} = Tesseract;
	var worker = {};
	var _progressCallback = p => console.log(p);
	var _fnResolve = () => {};
	var _fnReject = () => {};
	var _initPromise = new Promise(function (resolve, reject) {
		_fnResolve = resolve;
		_fnReject = reject;
	})

    tesseractWorker.loadImage = function (img, progressCallback, finallyCallback) {
		return _initPromise.then(function () {
			if(progressCallback) {
				_progressCallback = function (p) {
					progressCallback(p);
				};
			}
			return worker.recognize(img)
				.then(function (obj) {
					finallyCallback(obj);
				})
				.finally(async function() {
					//await worker.terminate();
				});
		});
    };

    tesseractWorker.stop = function () {
		worker.terminate();
	};
	
	tesseractWorker.init = function () {
		worker = createWorker({
			logger: _progressCallback
		});
		return worker.load().then(function () {
			return worker.loadLanguage(langs);
		}).then(function () {
			return worker.initialize(langs);
		}).then(function () {
			_fnResolve();
		}).catch(function () {
			_fnReject();
		})
	}

    return tesseractWorker;
  }(TesseractWorker || {}));
