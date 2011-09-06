
    // script.js
    // part of WineSeekr

    var initialLocation;
    var browserSupportFlag =  new Boolean();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var central_bc = new google.maps.LatLng(54,-125);
    var fusion_layer_id = '1364036';

    function set_user_location(map) {
      
      // Try W3C Geolocation (Preferred)
      if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          map.setCenter(initialLocation);
        }, function() {
          handleNoGeolocation(browserSupportFlag);
        });

      // Try Google Gears Geolocation
      } else if (google.gears) {
        browserSupportFlag = true;
        var geo = google.gears.factory.create('beta.geolocation');
        geo.getCurrentPosition(function(position) {
          initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
          map.setCenter(initialLocation);
        }, function() {
          handleNoGeoLocation(browserSupportFlag);
        });

      // Browser doesn't support Geolocation
      } else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
      }
      
      function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
          alert("Geolocation service failed.");
          initialLocation = central_bc;
        } else {
          alert("Your browser doesn't support geolocation. We've placed you in Central BC.");
          initialLocation = central_bc;
        }
        map.setCenter(initialLocation);
        
        var marker = new google.maps.marker({
            map: map, 
            position: initialLocation
        });
      }
    }
    
    var winery_layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'Geocodable address',
        from: fusion_layer_id 
      },
    });

    function initialize() {
        var myOptions = {
            zoom: 6,
            center: central_bc,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        set_user_location(map);
        map.setZoom(10);
        winery_layer.setMap(map);
    }


