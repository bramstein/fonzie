goog.provide('fonzie.Font');

/**
 * @param {{family: string, src: { woff: string, ttf: string }}} options
 * @constructor
 */
fonzie.Font = function(options) {
    /**
     * @type {string}
     */
    this.family = options.family;

    /**
     * @type {string}
     */
    this.weight = options.weight || 'normal';

    /**
     * @type {string}
     */
    this.style = options.style || 'normal';

    /**
     * @type {!{woff: string, ttf: string}}
     */
    this.src = options.src;

    /**
     * @type {function()}
     */
    this.loading = options.loading || goog.nullFunction;

    /**
     * @type {function()}
     */
    this.active = options.active || goog.nullFunction;

    /**
     * @type {function()}
     */
    this.inactive = options.inactive || goog.nullFunction;
}
