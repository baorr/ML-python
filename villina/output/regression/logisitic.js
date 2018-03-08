(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['../lib/basic', '../matrix/matrix'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('../lib/basic'), require('../matrix/matrix'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.basic, global.matrix);
		global.logisitic = mod.exports;
	}
})(this, function (_basic, _matrix) {
	'use strict';

	var _matrix2 = _interopRequireDefault(_matrix);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var initData = function initData() {
		for (var _len = arguments.length, m = Array(_len), _key = 0; _key < _len; _key++) {
			m[_key] = arguments[_key];
		}

		var al = m.length - 1;
		var resX = [];
		var resY = m[al];;
		var belta = [];
		var temp = [];
		var N = resY.length;

		for (var i = 0; i < N; i++) {
			temp = [1];
			for (var j = 0; j < al; j++) {
				temp.push(m[j][i]);
			}
			resX.push(temp);
		}

		al = al + 1;
		for (var _i = 0; _i < al; _i++) {
			belta.push(0);
		}

		return {
			x: resX,
			y: resY,
			b: belta
		};
	};

	var _genLinearResults = function _genLinearResults(b, x) {
		var sum = 0;
		b.forEach(function (e, index) {
			sum += e * x[index];
		});
		return sum;
	};

	var base = function base(b, x) {
		var y = _genLinearResults(b, x);
		var res = (0, _basic.exp)(y);
		return res;
	};

	var piFuc = function piFuc(b, x) {
		var bs = base(b, x);
		var res = bs / (1 + bs);
		return res;
	};

	var diffFunc = function diffFunc(b, x) {
		var p = base(b, x);
		p = p / (0, _basic.pow)(1 + p, 2);
		return -1 * p;
	};

	var genHMatrix = function genHMatrix(b, x) {
		var l = b.length;
		var xm = new _matrix2.default(x);

		xm = xm.transpose().mutiply(xm);

		xm.scalarMutiply(diffFunc(b, x));

		return xm;
	};

	var genFuncMatrix = function genFuncMatrix(b, x, y) {
		var xm = new _matrix2.default(x);
		var tempb = y - piFuc(b, x);

		xm.scalarMutiply(tempb);

		return xm;
	};

	var logisiticRegression = function logisiticRegression(x, y) {

		var obj = initData(x, y);
		var resX = obj.x;
		var b = obj.b;
		var bl = b.length;
		var fs = _matrix2.default.genMatrixByDefualt(1, bl);
		var Fs = _matrix2.default.genMatrixByDefualt(bl, bl);

		resX.forEach(function (e, index) {
			fs = fs.add(genFuncMatrix(b, e, y[index]));
			Fs = Fs.add(genHMatrix(b, e));
		});

		Fs.solveEqutionsByLU(fs.transpose());
	};
});