/*
* @Author: ziggy
* @Date:   2016-08-09 17:12:05
* @Last Modified by:   ziggy
*/


// get an instance of mongoose and mongoose.Schema
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var PhotoSchema  = new Schema({
    id: String,
    _id: String,
    height: String,
    width: String,
    source: String
}, {strict: false});

// pass our mongoose model using module.exports
module.exports = mongoose.model('Photo', PhotoSchema);