const express = require('express');
const router = express.Router();

const Tshirt = require('./models/Tshirt');


router.get('/', async (req, res) => { 
    let totaleOrdini=0;

    let magliette=await Tshirt.find({ numeroOrdini: { $ne: 0 } });
    
  
    if(!magliette){
        return res.status(404).json({message:"felpe non trovate"});
    }
    else{
        magliette.forEach(maglietta => {
            totaleOrdini += maglietta.numeroOrdini;
        });
        return res.status(200).json({magliette:magliette,totale:totaleOrdini});
    }
});




module.exports=router;