const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

    name : {
        type: String,        
    },

    walletId : {
        type: String,
        required: true
    }
})

mongoose.model("User",userSchema);