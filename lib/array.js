goog.provide('fonzie.array');

/**
 * Convert an array like object to an array.
 *
 * @param {!{length}} o
 * @return {!Array}
 */
fonzie.array.toArray = function(o) {
    return Array.prototype.slice.call(o, 0);
};
