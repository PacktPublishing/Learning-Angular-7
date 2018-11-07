import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  name: string;
  dueDate: Date;

  // @Output() newAssignment = new EventEmitter<Assignment>();
  newAssignment: Assignment;

  constructor(private assignmentService: AssignmentsService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const assignment = new Assignment();
    assignment.name = this.name;
    assignment.dueDate = this.dueDate;
    assignment.submitted = false;

    // this.newAssignment.emit(assignment);

    this.assignmentService.addAssignments(assignment);

  }

}
