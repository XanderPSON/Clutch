// Not sure what these did...

// $('body').on('click', '.button_to', function(e){
//  e.preventDefault();
//  var path = $(this).attr('action'),
//      method = $(this).attr('method');
//        if ($(':first-child', this).attr('value') == 'delete')
//          method = 'DELETE';
//  $.ajax({
//       url: path,
//       type: method,
//        dataType: 'html'
//     })
//     .done(function(response){
//          $('#info').html(response);
//     })
//     .fail(function(response){
//        console.log('fail')
//     })    
// });

// $('body').on('submit', '#event-form', function(e){
// e.preventDefault();
// var path = $(this).attr('action'),
//     method = $(this).attr('method'),
//     formData = $(this).serialize();
// $.ajax({
//     url: path,
//     type: method,
//     data: formData,
//     dataType: 'json'
//   })
//   .done(function(response){
//     $('#info').html('');
//     console.log(response)
//     map.featureLayer.setGeoJSON({
//       type: "FeaåtureCollection",
//       features: response
//     });
//   })
//   .fail(function(response){
//     console.log('fail')
//   })    
// })

// $('body').on('click', '.sign-in', function(e){
// e.preventDefault();
// var path = $(this).attr('href');
// $.ajax({
//      url: path,
//      type: 'GET',
//       dataType: 'html'
//    })
//    .done(function(response){
//         $('#sign-in-ajax').show();
//         $('#sign-in-ajax').html(response);
//    })
//    .fail(function(response){
//       console.log('fail')
//     })       
// })

//$("#menu-toggle").click(function(e) {
//         e.preventDefault();
//         $("#sidebar-wrapper").toggle();
//     });
//      $("#menu-toggle-2").click(function(e) {
//         e.preventDefault();
//         $("#sidebar-wrapper").toggleClass("toggled-2");
//         $('#menu ul').hide();
//     });

//      function initMenu() {
//       $('#sidebar-wrapper').hide();
//       $('#menu ul').children('.current').parent().show();
//       //$('#menu ul:first').show();
//       $('#menu li a').click(
//         function() {
//           var checkElement = $(this).next();
//           if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
//             return false;
//             }
//           if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
//             $('#menu ul:visible').slideUp('normal');
//             checkElement.slideDown('normal');
//             return false;
//             }
//           }
//         );
//       }
//     $(document).ready(function() {initMenu();});