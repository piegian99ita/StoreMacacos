const express = require('express');
const router = express.Router();
const Felpa = require('./models/Felpa');

router.get('/', async (req, res) => { 
    let totaleOrdini=0;

    let felpe=await Felpa.find({ numeroOrdini: { $ne: 0 } });
    
  
    if(!felpe){
        return res.status(404).json({message:"felpe non trovate"});
    }
    else{
        felpe.forEach(felpa => {
            totaleOrdini += felpa.numeroOrdini;
        });
        return res.status(200).json({felpe:felpe,totale:totaleOrdini});
    }
});



module.exports=router;