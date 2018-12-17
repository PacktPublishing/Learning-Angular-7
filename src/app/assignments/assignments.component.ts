import {Component, OnInit} from '@angular/core';
import {Assignment} from './assignment.model';
import {AssignmentsService} from '../shared/assignments.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  formVisible = false;

  selectedAssignment: Assignment;

  assignments: Assignment[];

  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }

  setSelected(assignment: Assignment) {
    // this.selectedAssignment = assignment;

    this.router.navigate(['/assignment/' + assignment.id]);
  }

  onAddBtnClick() {
    // this.formVisible = true;
    this.selectedAssignment = null;
  }

  // onNewAssignment(event: Assignment) {
  //   this.assignmentsService.addAssignments(event)
  //     .subscribe(success => console.log(success));
  //
  //   this.formVisible = false;
  // }

}
