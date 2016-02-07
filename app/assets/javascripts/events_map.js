$(document).on('page:change', function(){   // $(document).ready(function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoieGFuZGVycHNvbiIsImEiOiJjaWZvcml2YjU1Mnc2c3ZrcTlibmxjcXJuIn0.M7QobcyaQENSoLb86fvvug';
  var map = L.mapbox.map('map', 'xanderpson.o0la4oio', {zoomControl: false}).setView([37.761688, -122.481385], 13),
      filters = document.getElementById('filters');
  L.control.zoomslider({position: 'bottomright'}).addTo(map);

  map.featureLayer.on("ready", function(event) {
    getEvents(map);
    addEventPopups(map);
    addSidebar(map);
    event.target.on('mouseover', function(e){
      e.layer.openPopup();
    });
    map.scrollWheelZoom.disable();
  });

  $('#search-form').on('submit',function(e){
    e.preventDefault();
    var path = $(this).attr('action'),
        method = $(this).attr('method'),
        formData = $(this).serialize();
    $.ajax({
      url: path,
      type: method,
      data: formData,
      dataType: 'json'
    })
    .done(function(events){
      map.featureLayer.setGeoJSON({
        type: "FeatureCollection",
        features: events
      });
    })
    .fail(function(events){
      alert("Could not search");
    })
  }); //search form ajax

  $('.menu-ui a').on('click', function() {
    // For each filter link, get the 'data-filter' attribute value.
    var filter = $(this).data('filter');
    $(this).addClass('active').siblings().removeClass('active');
    map.featureLayer.setFilter(function(f) {
      if (filter === 'all') {
        return true;
      }
      else if (filter === 'food') {
        return (f.properties.category === 'restaurant exploring')
      }
      else if (filter === 'sports') {
        return (['soccer', 'basketball', 'tennis', 'cycling'].indexOf(f.properties.category) + 1)
      }
      else {
        return (f.properties.category === filter);
      }
    });
    return false;
  });

  $('body').on('click', '.create-event', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    $.ajax({
        url: '/events/new',
        type: 'GET',
        dataType: 'html'
      })
      .done(function(response){
          $('#info').html(response);
      })
      .fail(function(response){
        console.log('fail')
      })    
  }) //create event ajax

  $('body').on('submit', '#event-form', function(e){
  e.preventDefault();
  var path = $(this).attr('action'),
      method = $(this).attr('method'),
      formData = $(this).serialize();
  $.ajax({
      url: path,
      type: method,
      data: formData,
      dataType: 'json'
    })
    .done(function(response){
      $('#info').html('');
      console.log(response)
      map.featureLayer.setGeoJSON({
        type: "FeatureCollection",
        features: response
      });
    })
    .fail(function(response){
      console.log('fail')
    })    
  })



}); //document ready

function getEvents(map) {
  $.ajax({
    dataType: 'text',
    url: '/events/map.json',
    success: function(events) {
      var geojson = $.parseJSON(events);
      map.featureLayer.setGeoJSON({
        type: "FeatureCollection",
        features: geojson
      });
      // addClusters(map);
    },
    error: function() {
      alert("Could not load the events");
    }
  });
} //getEvents

function addEventPopups(map) {
  map.featureLayer.on('layeradd', function(e){
    var marker = e.layer,
        feature = marker.feature,
        properties = marker.feature.properties,
        popupContent =      '<div><strong>' + properties.name + '</strong>' +
                            '<br/>' + properties.description +
                            '<br/><br/><strong>' + properties.date_start + '</strong>: ' +
                            properties.time_start + ' - ' + properties.time_end +
                            '<br/><strong>Coming in Clutch: ' + properties.currently_attending + '/' + properties.max_size + '</div>'
                            // '<br/><strong>Category</strong> : ' + properties.category +
                            // '<br/><strong>Current / Max</strong> : ' + properties.currently_attending + ' / ' + properties.max_size +
                            // '<br/><strong>Host</strong> : ' + properties.host +
                            // '<br/><strong>Location</strong> : ' + properties.public_location +
                            // '<br/><strong>City</strong> : ' + properties.city +
                            // '<br/><strong>State</strong> : ' + properties.state +
                            // '<br/><strong>Zip</strong> : ' + properties.zip +
                            // '<br/><strong>Date start</strong> : ' + properties.date_start +
                            // '<br/><strong>Time start</strong> : ' + properties.time_start +
                            // '<br/><strong>Date end</strong> : ' + properties.date_end +
                            // '<br/><strong>Time end</strong> : ' + properties.time_end + '</div>'
  ;
    marker.bindPopup(popupContent, {closeButton: false, minWidth: 320});
  });
  // $('#map').on('click', '.trigger', function() {
  //   alert('Hello from Toronto!');
  // });
} //addEventPopups

function addClusters(map) {
    var clusterGroup = new L.MarkerClusterGroup();
    map.featureLayer.eachLayer(function(layer) {
        clusterGroup.addLayer(layer);
    });
    map.addLayer(clusterGroup);
} //addClusters

function addSidebar(map) {
  map.featureLayer.on('mouseover',function(e) {
  $.ajax({
      dataType: 'text',
      url: '/events/' + e.layer.feature.properties.id,
      success: function(event) {
      info.innerHTML = event;
      },
      error: function() {
        alert("Could not add sidebar");
      }
    });
  });
} //addSidebar