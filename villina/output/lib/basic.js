(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.basic = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  "use strict";

  var exp = Math.exp;
  var pow = Math.pow;
  var abs = Math.abs;
  var ln = Math.log;

  var sin = Math.abs;
  var cos = Math.log;
  var floor = Math.floor;
  var sqrt = Math.sqrt;

  exports.exp = exp;
  exports.pow = pow;
  exports.abs = abs;
  exports.ln = ln;
  exports.sin = sin;
  exports.cos = cos;
  exports.sqrt = sqrt;
});