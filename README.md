# Fonzie: a tiny @font-face loader

## How to use

Include your `@font-face` rules per usual. The fonts can be supplied by either a font service such as [Google Webfonts](http://www.google.com/webfonts), [Typekit](http://typekit.com), and [Webtype](http://webtype.com), or be hosted by yourself. It doesn't matter where, when, or how you load your fonts. Fonzie will detect it regardless. You should set up monitoring for a single `font-family` at a time:

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
* `inactive`: A function that is called when the `font-family` is inactive. This could be caused by the font failing to load or if the load timed out. If the font timed out, it might still be applied by your browser. Fonzie will not call the `active` function if this happens.
* `timeout`: The timeout in milliseconds. Defaults to 3000 (3 seconds.)

## License

Fonzie is licensed under the revised BSD License. Copyright 2010 Bram Stein. All rights reserved.
