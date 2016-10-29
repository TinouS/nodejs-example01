/**
 * Created by mac on 29/10/2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

var Schema = mongoose.Schema;

// create a shema

var postShema = new Schema({
    message : String,
    date : Date
});

// a model using the shema
var mypost = mongoose.model('post',postShema);

// make this available in node applications
module.exports = mypost


