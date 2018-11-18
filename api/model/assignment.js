let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dueDate: Date,
    name: String,
    submitted: Boolean
});

module.exports = mongoose.model('Assignment', AssignmentSchema);