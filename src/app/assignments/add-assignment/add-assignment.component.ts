import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {SnackbarComponent} from '../../snackbar/snackbar.component';

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

  constructor(private assignmentService: AssignmentsService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const assignment = new Assignment();
    assignment.id = Math.floor(Math.random() * 1000);
    assignment.name = this.name;
    assignment.dueDate = this.dueDate;
    assignment.submitted = false;

    // this.newAssignment.emit(assignment);

    this.assignmentService.addAssignments(assignment)
      .subscribe(res => this.router.navigate(['/home']));

    this.openSnackbar();
  }

  openSnackbar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000
    });
  }

}
