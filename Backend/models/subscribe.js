const mongoose = require('mongoose')

const subSchema = new mongoose.Schema({
    subEmail:{
        type:String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        required:[true,'Please add a email'],
        
    },
   
    
    
  
},{timestamps:true} )

module.exports = mongoose.model('subscriber',subSchema)