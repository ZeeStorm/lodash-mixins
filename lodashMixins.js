
n () {
    Array.prototype.alphanumSort = function (propertyOrPosition) {
        var caseInsensitive = true; //hardcoded to true until there is a need in the app for a case-sensitive sort (SB)
        for (var z = 0, t; t = propertyOrPosition ? this[z] ? this[z][propertyOrPosition] : this[z] : this[z]; z++) {
            if (propertyOrPosition) {
                this[z][propertyOrPosition] = [];
            } else {
                this[z] = [];
            }
            var x = 0, y = -1, n = 0, i, j;
            while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                var m = (i == 46 || (i >= 48 && i <= 57));
                if (m !== n) {
                    if (propertyOrPosition) {
                        this[z][propertyOrPosition][++y] = "";
                    } else {
                        this[z][++y] = "";
                    }
                    n = m;
                }
                if (propertyOrPosition) {
                    this[z][propertyOrPosition][y] += j;
                } else {
                    this[z][y] += j;
                }
            }
        }

        this.sort(function (a, b) {
            for (var x = 0, aa, bb; (aa = propertyOrPosition ? a[propertyOrPosition][x] : a[x]) && (bb = propertyOrPosition ? b[propertyOrPosition][x] : b[x]); x++) {
                if (caseInsensitive) {
                    aa = aa.toLowerCase();
                    bb = bb.toLowerCase();
                }
                if (aa !== bb) {
                    var c = Number(aa), d = Number(bb);
                    if (c == aa && d == bb) {
                        return c - d;
                    } else return (aa > bb) ? 1 : -1;
                }
            }
            return a.length - b.length;
        });

        for (var z = 0; z < this.length; z++) {
            if (propertyOrPosition) {
                if (this[z][propertyOrPosition]) {
                    this[z][propertyOrPosition] = this[z][propertyOrPosition].join("");
                } else {
                    this[z][propertyOrPosition] = "";
                }
            } else {
                this[z] = this[z].join("");
            }
        }

    };

    _.mixin({
        debounce: function (func, threshold, doNow) {
            var timeout;

            return function debounced() {
                var obj = this;
                var args = arguments;

                function delayed() {
                    if (!doNow) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (doNow) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            }
        },
        empty: function (object) {
            _.forEach(object, function (value, property) {
                delete object[property];
            });
            return object;
        },
        mapToPairs: function (map) {
            return _.map(map, function (value, property) {
                return [property, value];
            });
        },
        sortNatural: function (array, propertyOrPosition, reverse) {
            var sorted = _.clone(array);
            sorted.alphanumSort(propertyOrPosition);
            if (reverse) {
                return _(sorted).reverse();
            }
            return sorted;
        },
        uuid: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c === "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    });
})();

