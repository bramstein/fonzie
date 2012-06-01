goog.provide('fonzie.debug');

goog.scope(function() {
    var debug = fonzie.debug;

    /**
     * @param {!{length}} o
     * @return {!Array}
     */
    function toArray(o) {
        return Array.prototype.slice.call(o, 0);
    };

    /**
     * @const
     * @private
     * @type {number}
     */
    debug.startup = goog.now();

    /**
     * @private
     * @return {string}
     */
    function timestamp() {
        return ((goog.now() - debug.startup) / 1000).toFixed(3);
    }

    /**
     * @param {...*} var_args
     */
    debug.info = function(var_args) {
        if (goog.DEBUG) {
            window.console.log.apply(window.console, ['[%ss]', timestamp()].concat(toArray(arguments)));
        }
    };

    /**
     * @param {...*} var_args
     */
    debug.warn = function(var_args) {
        if (goog.DEBUG) {
            window.console.warn.apply(window.console, ['[%ss]', timestamp()].concat(toArray(arguments)));
        }
    };

    /**
     * @param {...*} var_args
     */
    debug.error = function(var_args) {
        if (goog.DEBUG) {
            window.console.error.apply(window.console, ['[%ss]', timestamp()].concat(toArray(arguments)));
        }
    };
});
