var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Utente', new Schema({ 
	username:{type:String, required:true, unique:true},
    email:{type:String, required:true},
    totale:{type:Number,required:true},
    
    tshirt:[{
        taglia:{type:String, required:true},
        colore:{type:String,required:true}
    }],
    felpa:[{
        taglia:{type:String, required:true},
        colore:{type:String,required:true}
    }],
}));