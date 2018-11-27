let Assignment = require('../model/assignment');

// Get all assignments
function getAssignments(req, res){
    Assignment.find( (err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// Get an assignment by ID
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Post an Assignment
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.name = req.body.name;
    assignment.dueDate = req.body.dueDate;
    assignment.submitted = req.body.submitted;

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.title} saved!`})
    })
}

// Update an assignment
function updateAssignment(req, res) {

    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            res.send(err)
        }
        res.json({message: `updated`})
      // console.log('updated ', assignment)
    });

}

// Delete an assignment
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.name} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
