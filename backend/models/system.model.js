const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const systemSchema = new Schema({
area: {type: Number , required: true},
size: {type: Number, required: true}
});
 
const System = mongoose.model('System', systemSchema);

module.exports = System;