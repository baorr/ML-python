(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../lib/basic'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../lib/basic'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.basic);
        global.matrix = mod.exports;
    }
})(this, function (module, exports, _basic) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var delta = 1e-10;

    var genArray = function genArray(rows, cols) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : delta;

        var mar = [];

        for (var i = 0; i < rows; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (var j = 0; j < cols; j++) {
                mar[i][j] = e;
            }
        }

        return new Matrix(mar);
    };

    var initValue = function initValue(A) {
        if (!(A instanceof Array)) throw 'A is not Array';

        var temp = JSON.parse(JSON.stringify(A));

        if (!(A[0] instanceof Array)) {
            temp = [temp];
        }
        return temp;
    };

    var _genMatrixByDefualt = function _genMatrixByDefualt(rows, cols) {
        var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var mar = [];
        for (var i = 0; i < rows; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (var j = 0; j < cols; j++) {
                mar[i][j] = v;
            }
        }
        return new Matrix(mar);
    };

    var Matrix = function () {
        function Matrix(A) {
            _classCallCheck(this, Matrix);

            this.matrix = initValue(A);
            this.rows = this.matrix.length;
            this.cols = this.matrix[0].length;
        }

        _createClass(Matrix, [{
            key: 'getSize',
            value: function getSize() {
                return {
                    rows: this.rows,
                    cols: this.cols
                };
            }
        }, {
            key: 'splitMatrix',
            value: function splitMatrix() {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var res = {
                    L: [],
                    D: [],
                    U: []
                };

                for (var i = 0; i < rows; i++) {
                    res.L[i] = res.L[i] ? res.L[i] : [];
                    res.U[i] = res.U[i] ? res.U[i] : [];
                    res.D[i] = res.D[i] ? res.D[i] : [];
                    for (var j = 0; j < cols; j++) {
                        var a = matrix[i][j];
                        if (i > j) {
                            res.L[i][j] = 0 - a;
                            res.D[i][j] = 0;
                            res.U[i][j] = 0;
                        } else if (i == j) {
                            res.L[i][j] = 0;
                            res.D[i][j] = 1 / a;
                            res.U[i][j] = 0;
                        } else if (i < j) {
                            res.L[i][j] = 0;
                            res.D[i][j] = 0;
                            res.U[i][j] = 0 - a;
                        }
                    }
                }

                return {
                    L: new Matrix(res.L),
                    D: new Matrix(res.D),
                    U: new Matrix(res.U)
                };
            }
        }, {
            key: 'add',
            value: function add(m) {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var addtionMatrix = m.matrix;
                var mar = [];

                for (var i = 0; i < rows; i++) {
                    mar[i] = mar[i] ? mar[i] : [];
                    for (var j = 0; j < cols; j++) {
                        mar[i][j] = addtionMatrix[i][j] + matrix[i][j];
                    }
                }

                var res = new Matrix(mar);
                return res;
            }
        }, {
            key: 'scalarMutiply',
            value: function scalarMutiply(muti) {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        matrix[i][j] = matrix[i][j] * muti;
                    }
                }
            }
        }, {
            key: 'substract',
            value: function substract(m) {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var addtionMatrix = m.matrix;
                var mar = [];

                for (var i = 0; i < rows; i++) {
                    mar[i] = mar[i] ? mar[i] : [];
                    for (var j = 0; j < cols; j++) {
                        mar[i][j] = matrix[i][j] - addtionMatrix[i][j];
                    }
                }

                var res = new Matrix(mar);
                return res;
            }
        }, {
            key: 'mutiply',
            value: function mutiply(m) {
                var matrix = this.matrix;
                var rows = this.rows;

                var mutiplyMatrix = m.matrix;

                var cols = mutiplyMatrix[0].length;
                var mutiCols = matrix[0].length;

                var mar = [];

                for (var i = 0; i < rows; i++) {
                    mar[i] = mar[i] ? mar[i] : [];
                    for (var j = 0; j < cols; j++) {
                        mar[i][j] = 0;
                        for (var k = 0; k < mutiCols; k++) {
                            mar[i][j] += matrix[i][k] * mutiplyMatrix[k][j];
                        }
                    }
                }

                var res = new Matrix(mar);
                return res;
            }
        }, {
            key: 'solveMarixEquation',
            value: function solveMarixEquation(b, initX) {
                var res = this.splitMatrix();

                var tempX = initX;

                var fixParts = res.L.add(res.U);
                var cons = res.D.mutiply(b);
                var N = 1;

                fixParts = res.D.mutiply(fixParts);
                initX = fixParts.mutiply(initX).add(cons);

                while (!tempX.compare(initX)) {
                    tempX = initX;
                    console.log('' + N++);
                    console.log('' + JSON.stringify(initX));
                    console.log('======================');
                    initX = fixParts.mutiply(initX).add(cons);
                }

                return tempX;
            }
        }, {
            key: 'compare',
            value: function compare(m) {
                var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : delta;

                var rows = this.rows;
                var cols = this.cols;

                var matrix = this.matrix;
                var compareMatrix = m ? m : _genMatrixByDefualt(rows, cols);
                compareMatrix = compareMatrix.matrix;

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        if ((0, _basic.abs)(matrix[i][j] - compareMatrix[i][j]) > e) {
                            return false;
                        }
                    }
                }

                return true;
            }
        }, {
            key: 'transpose',
            value: function transpose() {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var mar = [];

                for (var i = 0; i < cols; i++) {
                    mar[i] = mar[i] ? mar[i] : [];
                    for (var j = 0; j < rows; j++) {
                        mar[i][j] = matrix[j][i];
                    }
                }

                var res = new Matrix(mar);
                return res;
            }
        }, {
            key: 'getElementByColumn',
            value: function getElementByColumn(colIndex) {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = colIndex - 1;

                var mar = [];

                for (var i = 0; i < rows; i++) {
                    mar[i] = [];
                    mar[i][0] = matrix[i][cols];
                }

                var res = new Matrix(mar);
                return res;
            }
        }, {
            key: 'LUsplit',
            value: function LUsplit() {
                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var computeL = function computeL(i, j, L, U) {
                    var sum = 0;
                    var l = j;
                    for (var _k = 0; _k < l; _k++) {
                        sum += L[i][_k] * U[_k][j];
                    }
                    return sum;
                };

                var computeU = function computeU(i, j, L, U) {
                    var sum = 0;
                    var l = i;
                    for (var _k2 = 0; _k2 < l; _k2++) {
                        sum += L[i][_k2] * U[_k2][j];
                    }
                    return sum;
                };

                var L = [];
                var U = [];

                var k = 0;

                for (var i = 0; i < cols; i++) {
                    L[i] = L[i] ? L[i] : [];
                    U[i] = U[i] ? U[i] : [];
                    for (var j = 0; j < rows; j++) {
                        if (i <= j) {
                            U[i][j] = matrix[i][j] - computeU(i, j, L, U);
                            L[i][j] = i < j ? 0 : 1;
                        } else {
                            U[i][j] = 0;
                            L[i][j] = (matrix[i][j] - computeL(i, j, L, U)) / U[j][j];
                        }
                    }
                }

                return {
                    L: new Matrix(L),
                    U: new Matrix(U)
                };
            }
        }, {
            key: 'solveEqutionsByLU',
            value: function solveEqutionsByLU(b) {
                var m = this.LUsplit();

                var matrix = this.matrix;
                var rows = this.rows;
                var cols = this.cols;

                var computeY = function computeY(i, L, Y) {
                    var sum = 0;
                    var l = i;
                    for (var j = 0; j < l; j++) {
                        sum += L[i][j] * Y[j];
                    }
                    return sum;
                };

                var computeX = function computeX(i, U, X) {
                    var sum = 0;
                    var s = i + 1;
                    for (var j = s; j < cols; j++) {
                        sum += U[i][j] * X[j];
                    }
                    return sum;
                };

                console.log(m);

                var L = m.L.matrix;
                var U = m.U.matrix;
                var B = b.transpose().matrix[0];

                var Y = [B[0] / L[0][0]];

                for (var i = 1; i < cols; i++) {
                    Y[i] = (B[i] - computeY(i, L, Y)) / L[i][i];
                }

                var X = [];
                var N = cols - 1;

                X[N] = Y[N] / U[N][N];

                for (var _i = N - 1; _i > -1; _i--) {
                    X[_i] = (Y[_i] - computeX(_i, U, X)) / U[_i][_i];
                }

                return {
                    X: new Matrix(X),
                    Y: new Matrix(Y)
                };
            }
        }], [{
            key: 'genMatrixByDefualt',
            value: function genMatrixByDefualt(rows, cols) {
                var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                return _genMatrixByDefualt(rows, cols, v = 0);
            }
        }]);

        return Matrix;
    }();

    exports.default = Matrix;
    ;
    module.exports = exports['default'];
});