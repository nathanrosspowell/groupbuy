"use-strict";
// Turn the array of tier data into object with all the information.
function MakeGroupBuyData( tierArray ){
    // Default data.
    var data = {
        tiers : tierArray,
        totalJoined : 0,
        totalCommited: 0,
        currentTier : 0,
        neededForNextPrice : 0,
        neededForLowestPrice : 0
    };
    // Loop all the tiers,
    //     * if the joined and commited make the total
    //     * all overflow become joined in the next tier
    var extras = 0;
    for (i = 0; i < tierArray.length; i++) {
        var tier = tierArray[i];
        tier.joined += extras;
        extras = 0;
        var total = tier.joined + tier.commited;
        if ( total >= tier.quantity )
        {
            extras = total - tier.quantity;
            tier.joined = tier.quantity;
            tier.commited = 0;
            data.currentTier = tier;
        }
        data.totalJoined += tier.joined;
        data.totalCommited += tier.commited;
    }
    return data;
}

// Turn the information into a HTML on the specified div.
function WriteGroupBuyData( targetDiv, groupBuyData ){
    groupBuyData.tiers.forEach(function(tier){
        // Calculate a percentage for this tier.
        var value = (tier.joined / tier.quantity) * 100;
        // Build a well.
        var well = $('<div/>')
            .addClass('well-lg')
            .appendTo(targetDiv);
        // Make the progress parent div.
        var progress = $('<div/>')
            .addClass('progress')
            .appendTo(well);
        // Add the progress bar.
        var tier = $('<div/>')
            .addClass('progress-bar')
            .addClass('six-sec-ease-in-out')
            .appendTo(progress);
        // Set the dat onn the tier, then make it a progress bar.
        tier.attr('data-transitiongoal', Math.floor(value))
            .progressbar({
                update: function(joined_percentage, $this) {
                    var color = Math.round(joined_percentage / 100 * 255);
                    $this.parent().parent().css('background-color', 'rgb(' + color + ', 0, 0)');
            }
        });
    });
    var debug = $('#groupbuy-debug')
    if (debug.length > 0)
    {
        debug.append(JSON.stringify(groupBuyData));
    }
}

// Extend the jQuerey object to be able to use 'groupbuy'.
jQuery.fn.extend({
    groupbuy: function(options) {
        return this.each(function() {
            WriteGroupBuyData( this, MakeGroupBuyData(options));
        });
    }
});
