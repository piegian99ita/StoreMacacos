var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Divisa', new Schema({ 
    taglia:{type:String, required:true},
    nome:{type:String, required:true},
    numero:{type:String, required:true},
}));