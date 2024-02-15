const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please add a title']
    },
    category:{
        type:String,
        required:[true,'Please add a category']
    },
    type:{
        type:String,
        required:[true,'Please add a type']
    },
    paragraph:{
        type:String,
        required:[true,'Please add a paragraph']
    },
    image:{
       type:String,
       required:[true,'Please add an image']
    },
    pageViews:{
        type:Number,
        default:0

    }
    
    
  
},{timestamps:true} )

module.exports = mongoose.model('blog',blogSchema)