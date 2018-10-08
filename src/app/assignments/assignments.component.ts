import {Component, OnInit} from '@angular/core';
import {Assignment} from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  title = 'My Assignments Application';
  enabled = false;
  formVisible = false;

  selectedAssignment: Assignment;

  assignments: Assignment[] = [{
    name: 'Maths',
    dueDate: new Date('2018-01-01'),
    submitted: true
  },
    {
      name: 'Science',
      dueDate: new Date('2019-01-01'),
      submitted: false
    }
  ];

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.enabled = true;
    }, 2000);
  }

  setSelected(assignment: Assignment) {
    this.selectedAssignment = assignment;
  }

  onAddBtnClick() {
    this.formVisible = true;
    this.selectedAssignment = null;
  }

  onNewAssignment(event: Assignment) {
    this.assignments.push(event);
    this.formVisible = false;
  }

}
