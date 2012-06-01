goog.provide('fonzie');

goog.require('fonzie.debug');

var head = document.querySelector('head'),
    style = document.createElement('style');

style.textContent =
"@font-face {" +
    "font-family: '__ruler__';" +
    "src: url(data:application/x-font-woff;base64," +
              "d09GRk9UVE8AAANcAAsAAAAABPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAACnAAAAH8A" +
              "AACCP5sz9UZGVE0AAAM4AAAAHAAAABxer2zJR0RFRgAAAxwAAAAbAAAAIAAvAARPUy8yAAABWAAA" +
              "AEQAAABgPQpO7WNtYXAAAAJUAAAANwAAAUIADQMQaGVhZAAAAQgAAAAqAAAANvb6pPhoaGVhAAAB" +
              "NAAAABoAAAAkDmgUz2htdHgAAANUAAAACAAAAAgwAAAAbWF4cAAAAVAAAAAGAAAABgACUABuYW1l" +
              "AAABnAAAALYAAAFQwq89s3Bvc3QAAAKMAAAAEAAAACAAAwABeNpjYGRgYGBkcNz4b59BPL/NVwZu" +
              "DgYQOP1O/y4yDQUcDEwgCgBNrQonAAB42mNgZGDgS/tzhoFBggEKGBlQARMARYgCWQAAAABQAAAC" +
              "AAB42mNglmBgnMDAysjBasxyhoGBYSaEZjrDYMSoA6QZWBnggJEBCSgAAYMDQyZDJlvavzTGWRwM" +
              "jLNQ1CgAISMA55UJe3jaRY2/DoJADMY/4CAyGGF1up1AuNHc5OALOLA7MLBAcoTBxcE4+GQ+l1/P" +
              "Jra99te/B6DCBwlEEqQolFPGvXJGapQNs7NyzvpNuWDnrlwxPpVrxjd3ElOSTLwmnFJL5QxHHJQN" +
              "L52Uc9YvygV2WJQr7j6Ua/ILARsQ+K7RHDr0VAcPq+p/Q67re+ctxct8YEeCpRswMl8x8aOZ9f8V" +
              "DGNYp2W2cRvxUisfha0VH20T+wKo/R1PAAB42mNgYGBmgGAZBkYGELAB8hjBfBYGBSDNAoQgfub/" +
              "/xDy/wyoSgZGNgYYk/aAbhaRBgCpywccAHjaY2BmQAaMDGgAAACOAAV42mNkYGFhYGRkZC0q1Q1i" +
              "YGRiYGRw+iHN8EOG6Ycs8w9Rlh4exm4e5m4eFjkuBpYODfnubjiDh70bCFhlGHL4ZRgYBGQY8gVl" +
              "GLhkGCqEGJhB5rAxcDJwG+oZGBgWKZQWlTIAgRcDEyMjEwvfN75fU0RkxKeKdvNwAQAV/hfzAHja" +
              "Y2BkYGDgA2IJBhBgYmCEQhYwjwEABFUANAAAAAABAAAAAMbULpkAAAAAy+2yDAAAAADL7YwjGAAA" +
              "ABgAAAA=) format('woff')," +
           "url(data:font/truetype;base64," +
              "AAEAAAALAIAAAwAwT1MvMj/GRsAAAAE4AAAAYGNtYXAAHQIlAAABoAAAAGhnYXNwABcAAwAAA2gA" +
              "AAAQZ2x5ZgAAAAAAAAIIAAAAAGhlYWT2+YNvAAAAvAAAADZoaGVhiAGWaAAAAPQAAAAkaG10eBwA" +
              "AAAAAAGYAAAACGxvY2EAAAAAAAACCAAAAAZtYXhwAAMAAQAAARgAAAAgbmFtZTz3voUAAAIQAAAB" +
              "N3Bvc3QAAwAAAAADSAAAACAAAQAAAAEAQg5P4GJfDzz1AAsIAAAAAADL7bIMAAAAAMvtjCMAAAAA" +
              "AAAAAAAAAAkAAgAAAAAAAAABAAAIAP5mAAAYAH//f/8AAAABAAAAAAAAAAAAAAAAAAAAAgABAAAA" +
              "AgAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAMOAAGQAAUBCAUzBMwAAACZBTMEzAAAAswAMgEs" +
              "AAACAAUAAAAAAAAAAAAAAQAAAAAAAAAAAAAAACAgICAAQABpAGkGZv5mAZoIAAGaAAAAAQAAAAAB" +
              "9AK8AAAAIAAABAAAABgAAAAAAAADAAAAAwAAAEgAAQAAAAAAHAADAAEAAAAoAAYADAAAAGkAAQAB" +
              "AAQAIAAAAAQABAABAAAAaf//AAAAaf///5gAAQAAAAAABAAgAAAABAAEAAEAAABp//8AAABp////" +
              "mAABAAAAAAAAAAAAAAAAAAAAEADGAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQABAAEAAAAAAAMADQAC" +
              "AAEAAAAAAAQAAwAPAAEAAAAAAAUADQASAAEAAAAAAAYABAAfAAEAAAAAABAAAQAjAAEAAAAAABEA" +
              "AQAkAAMAAQQJAAEABAAlAAMAAQQJAAIAAgApAAMAAQQJAAMAGgArAAMAAQQJAAQABgBFAAMAAQQJ" +
              "AAUAGgBLAAMAAQQJAAYACABlAAMAAQQJABAAAgBtAAMAAQQJABEAAgBvcnUxLjAwMTsgICAgO3J1" +
              "ciB1VmVyc2lvbiAxLjAwMXJ1LVJydQByAHUAUgAxAC4AMAAwADEAOwAgACAAIAAgADsAcgB1AHIA" +
              "IAB1AFYAZQByAHMAaQBvAG4AIAAxAC4AMAAwADEAcgB1AC0AUgByAHUAAAMAAAAAAAAAAAAAAAAA" +
              "AAAAAAAAAAAAAAAAAAAAAAAAAAADAAgAAAAQAAD//wAA) format('truetype');" +
"}";

head.appendChild(style);

goog.scope(function() {
    var debug = fonzie.debug;

    fonzie.monitor = function(family, options) {
        var running = true,
            hasFallbackWidth = false,
            ruler = document.createElement('span'),
            active = options && options['active'] || goog.nullFunction,
            inactive = options && options['inactive'] || goog.nullFunction,
            timeout = options && options['timeout'] || 3000;

        ruler.textContent = 'iii';
        ruler.style.cssText = 'display:block;font-size:20px;font-family:monospace;position:absolute;top:0;visibility:hidden;width:auto;height:auto;margin:0;padding:0;font-variant:normal;';

        document.body.appendChild(ruler);

        var monospaceWidth = ruler.clientWidth;

        debug.info(family + ': Generic monospace font applied.');

        goog.global.setTimeout(function() {
            running = false;
        }, timeout);

        var rulerInterval = goog.global.setInterval(function() {
            if (running) {
                if (ruler.clientWidth === 180) {
                    goog.global.clearInterval(rulerInterval);
                    debug.info(family + ': Ruler has loaded.');
                    var fontInterval = goog.global.setInterval(function() {
                        if (running) {
                            if (hasFallbackWidth) {
                                if (ruler.clientWidth === 180) {
                                    // If we are in a browser that falls back to a different font
                                    // and we get 180, we know the externally loaded font failed to
                                    // load and it fell back to the ruler font.
                                    goog.global.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.error(family + ': Font failed to load, fall back to ruler font.');
                                    inactive();
                                } else if (ruler.clientWidth !== monospaceWidth) {
                                    // A browser that falls back to a different font will fall back
                                    // to the generic font (monospace in our case) so any other value
                                    // (apart from 180, handled above) means our font loaded.
                                    goog.global.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.info(family + ': Font loaded.');
                                    active();
                                }
                            } else {
                                // If we are in a browser that does not fall back to another font,
                                // we can just use the first change in width that comes along.
                                if (ruler.clientWidth !== 180) {
                                    goog.global.clearInterval(fontInterval);
                                    document.body.removeChild(ruler);
                                    debug.info(family + ': Font loaded.');
                                    active();
                                }
                            }
                        } else {
                            // Timeout while waiting for the font to load
                            goog.global.clearInterval(fontInterval);
                            document.body.removeChild(ruler);
                            debug.warn(family + ': Timeout while waiting for the font to load, font may still load.');
                            inactive();
                        }
                    }, 25);

                    // Set the actual font
                    ruler.style.fontFamily = "'" + family + "','__ruler__',monospace";
                    debug.info(family + ': Triggering font load.');
                }
            } else {
                // Timeout waiting for the ruler to load
                goog.global.clearInterval(rulerInterval);
                document.body.removeChild(ruler);
                debug.error(family + ': Timeout while waiting for the ruler to load.');
                inactive();
            }
        }, 25);

        // Change the ruler font-family so it starts loading the font (if it hasn't already loaded.)
        ruler.style.fontFamily = "'__ruler__',monospace,sans-serif";
        hasFallbackWidth = ruler.clientWidth !== monospaceWidth;

        // Immediately compare to the monospaceWidth we measured earlier to see if this is a browser
        // that falls back to the generic font family when loading external fonts. This seems to
        // happen only (sometimes) in Webkit browsers.
        debug.info(family + ': Browser falls back to generic font while loading external fonts: ' + hasFallbackWidth + '.');
    };
});

goog.exportSymbol('fonzie', fonzie.monitor);
