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
      day: day,
      month: month,
      year: year
    });


  },

  "dynamicdate" : function(req,res){

    res.view();


  }

};

