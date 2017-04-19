/**
 * TimetellerController
 *
 * @description :: Server-side logic for managing timetellers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  "date" : function(req,res){
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getUTCFullYear();

    res.json({
      datetime: d,
      day: day,
      month: month,
      year: year
    });


  },

  "dynamicdate" : function(req,res){
    // redirects to the view where you're asked to input location
    res.view();
  },

  show: function (req,res,next){
    var http = require('http');



    // initial webservice request
    function getCurrentTime(time, callback) {

        // webapp link --> https://www.amdoren.com/api/timezone.php?api_key=428SsGhnM2NA4eUzt9KBYKdpksMgHQ&loc=Malaysia,Kuala+Lumpur

      options = {
        host: 'www.amdoren.com',
        port: 80,
        path: '/api/timezone.php?api_key=428SsGhnM2NA4eUzt9KBYKdpksMgHQ&loc=' +time.location,
        method: 'GET'
      };

      // This is asynchronous - won't guarantee we get the response before we use it
      var webservice_request = http.request(options, function(response) {
        process_response(response, time, callback)
      });
      webservice_request.end();
    } // END of getCurrentTime


    // Handles the data that we get back
    function process_response(webservice_response, time, callback) {
      var webservice_data = "";
      webservice_response.on('error', function(e) {
        console.log(e.message);
        callback("Error: " + e.message);
      });
      webservice_response.on('data', function(chunk) {
        webservice_data += chunk;
      });

      webservice_response.on('end', function() {
        var timeData = JSON.parse(webservice_data);
        time.currentDateTime = timeData.time;
        console.log(time.currentDateTime);
        callback();
      });
    };




  }
};

