var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Tshirt', new Schema({ 
	taglia:{type:String, required:true},
    
    colore:{type:String, required:true},
    numeroOrdini:{type:Number, required:true},
    nomi:[{type:String, required:true}],
}));