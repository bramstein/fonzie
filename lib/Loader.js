goog.provide('fonzie.Loader');

goog.require('fonzie.debug');
goog.require('fonzie.Font');
goog.require('fonzie.RulerFont');

/**
 * @constructor
 * @param {Object=} options
 */
fonzie.Loader = function(options) {

    /**
     * @const
     * @type {number}
     */
    this.timeout = options && options.timeout || 3000;

    /**
     * @const
     * @type {number}
     */
    this.pollingInterval = options && options.pollingInterval || 25;

    this.createFontFace(fonzie.RulerFont);
};

goog.scope(function() {
    var Loader = fonzie.Loader,
        debug = fonzie.debug;

    /**
     * @param {fonzie.Font} font
     * @private
     */
    Loader.prototype.createFontFace = function(font) {
        var head = document.querySelector('head'),
            style = document.createElement('style');

        style.textContent = "@font-face { font-family: '" + font.family + "'; src: url(" + font.src.woff + ") format('woff'), url(" + font.src.ttf + ") format('truetype'); font-weight: " + font.weight + "; font-style: " + font.style + "; }";

        head.appendChild(style);
    };

    /**
     * @param {fonzie.Font} font
     */
    Loader.prototype.load = function(font) {
        var loading = true,
            hasFallbackWidth = false,
            ruler = document.createElement('span');

        font.loading();

        this.createFontFace(font);

        ruler.textContent = 'iii';
        ruler.style.cssText = 'display: inline-block; font-size: 20px; font-family: monospace; position: absolute; top: 0; left: 0; visibility: hidden;';

        document.body.appendChild(ruler);

        var monospaceWidth = ruler.clientWidth;

        debug.info('Generic monospace font applied.');

        window.setTimeout(function() {
            loading = false;
        }, this.timeout);

        var rulerInterval = window.setInterval(function() {
            if (loading) {
                if (ruler.clientWidth === 180) {
                    window.clearInterval(rulerInterval);
                    debug.info('Ruler has loaded.');
                    var fontInterval = window.setInterval(function() {
                        if (loading) {
                            if (hasFallbackWidth) {
                                if (ruler.clientWidth === 180) {
                                    // If we are in a browser that falls back to a different font
                                    // and we get 180, we know the externally loaded font failed to
                                    // load and it fell back to the ruler font.
                                    window.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.warn('Font failed to load, fall back to ruler font.');
                                    font.inactive();
                                } else if (ruler.clientWidth !== monospaceWidth) {
                                    // A browser that falls back to a different font will fall back
                                    // to the generic font (monospace in our case) so any other value
                                    // (apart from 180, handled above) means our font loaded.
                                    window.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.info('Font loaded.');
                                    font.active();

                                }
                            } else {
                                // If we are in a browser that does not fall back to another font,
                                // we can just use the first change in width that comes along.
                                if (ruler.clientWidth !== 180) {
                                    window.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.info('Font loaded.');
                                    font.active();
                                }
                            }
                        } else {
                            // Timeout while waiting for the font to load
                            window.clearInterval(fontInterval);
                            document.body.removeChild(ruler);
                            debug.warn('Timeout while waiting for the font to load, font may still load.');
                            font.inactive();
                        }
                    }, this.pollingInterval);

                    // Set the actual font
                    ruler.style.fontFamily = "'" + font.family + "', '__ruler__', monospace";
                    debug.info('Triggering font load.');
                }
            } else {
                // Timeout waiting for the ruler to load
                window.clearInterval(rulerInterval);
                document.body.removeChild(ruler);
                debug.error('Timeout while waiting for the ruler to load.');
                font.inactive();
            }
        }, this.pollingInterval);

        // Change the ruler font-family so it starts loading the font (if it hasn't already loaded.)
        ruler.style.fontFamily = "'__ruler__', monospace, sans-serif";
        hasFallbackWidth = ruler.clientWidth !== monospaceWidth;

        // Immediately compare to the monospaceWidth we measured earlier to see if this is a browser
        // that falls back to the generic font family when loading external fonts. This seems to
        // happen only (sometimes) in Webkit browsers.
        debug.info('Browser falls back to generic font while loading external fonts: ' + hasFallbackWidth + '.');
    };
});
