**WARNING**: The improvements in this @font-face loader have now been integrated into the [webfontloader](https://github.com/typekit/webfontloader), which is actively maintained. This project will receive no further updates, so I highly recommend using the webfontloader instead.


## Fonzie: a tiny @font-face loader

Fonzie is a tiny `@font-face` loader/monitor (only 3.9Kb, and 2.2Kb gzipped) compatible with any web-font service. It will monitor when an external font is applied to the page and notify you by a callback. Fonzie does not limit you in any way in where, when, or how you load your fonts. Fonzie also correctly handles the peculiar way Webkit loads external fonts transparently, so your font `active` and `inactive` callbacks are reliable. 

## How to use

Include your `@font-face` rules as usual. The fonts can be supplied by either a font service such as [Google Webfonts](http://www.google.com/webfonts), [Typekit](http://typekit.com), and [Webtype](http://webtype.com) or be hosted by yourself. It doesn't matter where, when, or how you load your fonts. Fonzie will detect it regardless. You should set up monitoring for a single `font-family` at a time:

    fonzie('Droid Sans', {
        active: function() {
            // Font is active
        },
        inactive: function() {
            // Font is inactive
        }
    });

The first parameter to `fonzie` is the name of the font. This should match the `font-family` property in your `@font-face` rules. The second parameter is optional and can contain three properties:

* `active`: A function that is called when the `font-family` is or becomes active.
* `inactive`: A function that is called when the `font-family` is inactive. This could be caused by the font failing to load or if the load timed out. If the loading timed out, the font might still be applied by your browser. Fonzie will not call the `active` function if this happens.
* `timeout`: The timeout in milliseconds. Defaults to 3000 (3 seconds.)

## Browser support
Fonzie has been tested and works on the following browsers:

* Chrome
* Firefox
* Opera
* Safari
* IE9
* Android ICS browser
* Chrome Beta on Android
* Opera Mobile 12
* iOS 5 browser
* Firefox for Mobile

IE6, IE7 and IE8 are not supported at the moment. Adding support for these browser should be trivial if there is a need for it (basically adding an EOT file.)

## License

Fonzie is licensed under the revised BSD License. Copyright 2012 Bram Stein. All rights reserved.
