$(document).ready(function() {
    "use-strict";
    var bar1Target = 100, bar1Current = 90, bar1Value = 0
        bar2Target = 100, bar2Current = 10, bar2Value = 0;

    bar1Value = (bar1Current / bar1Target) * 100;
    bar2Value = (bar2Current / bar2Target) * 100;


    console.log( bar1Value );
    console.log( bar2Value );

    $('#pb1 .progress-bar')
        .attr('data-transitiongoal', Math.floor(bar1Value))
        .progressbar({
        update: function(current_percentage, $this) {
            $this.parent().parent().css('background-color', 'rgb(' + Math.round(current_percentage / 100 * 255) + ', 0, 0)');
        }
    });

    $('#pb2 .progress-bar')
        .attr('data-transitiongoal', 10 )
        .progressbar({
        update: function(current_percentage, $this) {
            $this.parent().parent().css('background-color', 'rgb(' + Math.round(current_percentage / 100 * 255) + ', 0, 0)');
        }
    });

})
