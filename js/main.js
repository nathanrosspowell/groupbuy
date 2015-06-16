$(document).ready(function() {
    "use-strict";

    var data = [
        {
            target : 100,
            current : 90
        },
        {
            target : 100,
            current : 50 
        },
        {
            target : 100,
            current : 20
        }
    ];
        
    var targetDiv = $('#target-div')
    data.forEach(function(entry){
        var value = (entry.current / entry.target) * 100;
        var well = $('<div/>')
            .addClass('well-lg')
            .appendTo(targetDiv);
        var progress = $('<div/>')
            .addClass('progress')
            .appendTo(well);
        var bar = $('<div/>')
            .addClass('progress-bar')
            .addClass('six-sec-ease-in-out')
            .appendTo(progress);
        bar.attr('data-transitiongoal', Math.floor(value))
            .progressbar({
                update: function(current_percentage, $this) {
                    $this.parent().parent().css('background-color', 'rgb(' + Math.round(current_percentage / 100 * 255) + ', 0, 0)');
            }
        });
    });
})
