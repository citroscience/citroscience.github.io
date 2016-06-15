(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.marginotes = function (options) {
      options = options || {}
      var field = options.field || 'desc'
      var spans = this.filter('span')

      $('body').append('<div class="margintooltip" style="display: none;"></div>')
      spans.css({
        'border-bottom': '1px dashed #337ab7',
        'cursor': 'help'
      })
      this.hover(function (e) {
        var description = $(this).attr(field)
        var parent = $(this.parentElement)
        var position = parent.position()
        var tooltip = $('.margintooltip')
        var width = Math.min(options.width || 100)

        if (width < 60 || !description) {
          return
        }

        tooltip
          .css({
            'border-left': 'solid 2px #751aff',
            'font-size': '14px',
            'left': position.left + width + 610,
            'min-height': parent.height(),
            'padding-left': '7px',
            'position': 'absolute',
            'text-align': 'left',
            'top': position.top,
            'width': width
          })
          .text(description)
          .stop()
          .fadeIn({
            duration:100,
            queue: false
          })
      }, function () {
        $('.margintooltip').stop()
        $('.margintooltip').fadeOut({
          duration: 100
        })
      })
    }
}));
