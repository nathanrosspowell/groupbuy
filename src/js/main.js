$(document).ready(function() {
    "use-strict";
    var target = 90;
    $('.progress .progress-bar')
        .attr('data-transitiongoal', target)
        .progressbar({
        update: function(current_percentage, $this) {
            $this.parent().parent().css('background-color', 'rgb(' + Math.round(current_percentage / 100 * 255) + ', 0, 0)');
        }
    });
})
