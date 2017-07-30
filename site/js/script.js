(function (window) {
    "use strict";
        
    /**
     * GOOGLE MAPS CODE 
     */
    
    // center of US
    var origin = {
            lat : 39.8283,
            lng : -98.5795
        },
        map,
        heatmap;
    
    // callback for google maps init
    window.initMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom      : 2,
            center    : origin,
            mapTypeId : 'satellite'
        });

    };
    
    //Update the heatmap to show where the tweets occurred
    var updateHeatmap = function (points) {
        // if we already have a heatmap layer, clear it
        if (heatmap) heatmap.setMap(null);
        
        // set the heatmap layer with our plot points from our search
        heatmap = new google.maps.visualization.HeatmapLayer({
            data    : points,
            map     : map,
            radius  : 10,
            opacity : .8
        });       
    };
    
    /**
     * Helper for updating result count
     */
    var updateResultCount = function (total) {
        // set the value
        $("#total").data("badge", total);
        // update the dom
        $("#total").attr("data-badge", total);
    }
    
    /**
     * FORM HANDLING FUNCTIONS
     */
    
    $(function () {
        // element references
        var $searchButton = $("#search"),
            $searchInput  = $("#flutrack-search"),
            $searchTerms  = $("#search-terms"),
            keyCode       = {
                ENTER : 13   
            };
            
        /**
         * Helper methods
         */
        
        var processSearch = function(term) {
            // only call our search endpoint if there is something to search for
            if (term.trim() !== "") {
                callSearch(term);
            }
        };
        
        var resetInput = function () {
            // show current search term on page
            $searchTerms.text($searchInput.val());
            
            // clear out the search value
            $searchInput.val("");            
        };
        
        /**
         * Search Event handlers
         */
        
        // search input event handler to check for enter key
        $searchInput.on("keyup", function (evt) {
            // if we received and enter keypress then process search terms
            if (evt.keyCode === keyCode.ENTER) {
                processSearch($searchInput.val());
                
                // clear the input and update the screen
                resetInput();
            }    
        });
        
        // search input event handler to check for button click
        $searchButton.on("click", function (evt) {
            // if we received a click even then process search terms
            processSearch($searchInput.val());
            
            // clear the input and update the screen
            resetInput();
        });
        
        // set focus to input
        $searchInput.focus();       
    });
          
    /**
     * Ajax call to Flutrack proxy.  The Flutrack server isn't set up
     * for CORS requests.  Using a proxy gets around this limitation.
     */
    
    var callSearch = function (term) {
        var points = [];
        $("#map").addClass("loading");
        updateResultCount("");
        
        $.getJSON("search/" + term, function (data) {
            data.forEach(function(tweet){
                points.push(new google.maps.LatLng(tweet.latitude, tweet.longitude));
            });
            
            updateHeatmap(points);
            updateResultCount(data.length);
            $("#map").removeClass("loading");
        });
    }
       
})(window);