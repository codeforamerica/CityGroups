(function($) {
    $(document).ready(function() {
    
        $('.step-editable').hide();
        
        $('a[href^=#step-]:not(.step-editable)').click(function() {
            var $thisObj = $(this);
            var step = $thisObj.attr('href');
            step = step.split("#")[1]
            
            // Toggle view
            $('.' + step + '-editable').toggle('slow', function() {
                // Redraw google map
                if (typeof google != 'undefined' && typeof maps != 'undefined') {
                    for (var i in maps) {
                        google.maps.event.trigger(maps[i], 'resize');
                    }
                }
            });
            
            return false;
        });
        
    });
})(jQuery);