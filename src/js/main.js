$(document).ready(function() {
    "use-strict";

    // Turn the array of tier data into object with all the information.
    function MakeGroupBuyData( barArray ){
        var data = {
            bars : barArray,
            totalJoined : 0,
            totalCommited: 0,
            currentPrice : 0,
            neededForNextPrice : 0,
            neededForLowestPrice : 0
        };
        return data;
    }
    
    // Turn the information into a HTML on the specified div.
    function WriteGroupBuyData( targetDiv, groupBuyData ){
        groupBuyData.bars.forEach(function(bar){
            var value = (bar.joined / bar.quantity) * 100;
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
                    update: function(joined_percentage, $this) {
                        var color = Math.round(joined_percentage / 100 * 255);
                        $this.parent().parent().css('background-color', 'rgb(' + color + ', 0, 0)');
                }
            });
        });
    }

    // Extend the jQuerey object to be able to use 'groupbuy'.
    jQuery.fn.extend({
        groupbuy: function(options) {
            return this.each(function() {
                WriteGroupBuyData( this, MakeGroupBuyData(options));
            });
        }
    });
    
    // Debug test.
    $('#target-div').groupbuy([
            {
                quantity : 100,
                price : 99.99,
                joined : 90,
                commited : 10
            },
            {
                quantity : 200,
                price : 79.99,
                joined : 50,
                commited : 10
            },
            {
                quantity : 400,
                price : 59.99,
                joined : 20,
                commited : 10
            }
        ]
    );
})
