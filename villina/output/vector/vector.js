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
        global.vector = mod.exports;
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

    var initValue = function initValue(A) {
        if (!(A instanceof Array)) throw 'A is not Array';

        var temp = JSON.parse(JSON.stringify(A));

        if (!(A[0] instanceof Array)) {
            temp = [temp];
        }
        return temp;
    };

    var Vector = function () {
        function Vector(A) {
            _classCallCheck(this, Vector);

            this.elem = initValue(A);
            this.rows = this.elem.length;
            this.cols = this.elem[0].length;
        }

        _createClass(Vector, [{
            key: 'unitilize',
            value: function unitilize() {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;
                var results = [];

                var d = this.distance();

                for (var i = 0; i < rows; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < cols; j++) {
                        results[i].push(elem[i][j] / d);
                    }
                }

                return new Vector(results);
            }
        }, {
            key: 'distance',
            value: function distance() {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;

                var sum = 0;

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        sum += elem[i][j] * elem[i][j];
                    }
                }

                return (0, _basic.sqrt)(sum);
            }
        }, {
            key: 'getSize',
            value: function getSize() {
                return {
                    rows: this.rows,
                    cols: this.cols
                };
            }
        }, {
            key: 'add',
            value: function add(m) {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;

                var addtionElem = m.elem;
                var results = [];

                for (var i = 0; i < rows; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < cols; j++) {
                        results[i][j] = addtionElem[i][j] + elem[i][j];
                    }
                }

                var res = new Vector(results);
                return res;
            }
        }, {
            key: 'scalarMutiply',
            value: function scalarMutiply(muti) {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;
                var results = [];

                for (var i = 0; i < rows; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < cols; j++) {
                        results[i][j] = elem[i][j] * muti;
                    }
                }

                var res = new Vector(results);
                return res;
            }
        }, {
            key: 'substract',
            value: function substract(m) {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;

                var substractElem = m.elem;
                var results = [];

                for (var i = 0; i < rows; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < cols; j++) {
                        results[i][j] = elem[i][j] - substractElem[i][j];
                    }
                }

                var res = new Vector(results);
                return res;
            }
        }, {
            key: 'mutiply',
            value: function mutiply(v) {
                var elem = this.elem;
                var rows = this.rows;

                var mutiplyElem = v.elem;

                var cols = mutiplyElem[0].length;
                var mutiCols = elem[0].length;

                var results = [];

                for (var i = 0; i < rows; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < cols; j++) {
                        results[i][j] = 0;
                        for (var k = 0; k < mutiCols; k++) {
                            results[i][j] += elem[i][k] * mutiplyElem[k][j];
                        }
                    }
                }

                var res = new Vector(results);
                return res;
            }
        }, {
            key: 'innerProduct',
            value: function innerProduct(v) {
                var elem = this.elem;
                var velem = v.elem;
                var rows = this.rows;
                var cols = this.cols;
                var sum = 0;

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        sum += elem[i][j] * velem[i][j];
                    }
                }

                return sum;
            }
        }, {
            key: 'transpose',
            value: function transpose() {
                var elem = this.elem;
                var rows = this.rows;
                var cols = this.cols;

                var results = [];

                for (var i = 0; i < cols; i++) {
                    results[i] = results[i] ? results[i] : [];
                    for (var j = 0; j < rows; j++) {
                        results[i][j] = elem[j][i];
                    }
                }

                var res = new Vector(results);
                return res;
            }
        }]);

        return Vector;
    }();

    exports.default = Vector;
    ;
    module.exports = exports['default'];
});