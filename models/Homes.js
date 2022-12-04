const { Schema, model, ObjectId } = require('mongoose');

const HomesSchema = Schema({
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true,
        unique: true
    },
    userId: {
        type: ObjectId, 
        require: true
    }
});


module.exports = model('Homes', HomesSchema );

