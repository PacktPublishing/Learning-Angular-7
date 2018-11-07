import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  passedAssignment: Assignment;

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params.id;

    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.passedAssignment = assignment);
  }

  onAssignmentSubmitted() {
    this.passedAssignment.submitted = true;

    this.assignmentsService.updateAssignments(this.passedAssignment)
      .subscribe(success => console.log(success));
  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.passedAssignment)
      .subscribe(res => console.log(res));

    // this.passedAssignment = null;

    this.router.navigate(['/home']);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.passedAssignment.id, 'edit'],
      {queryParams: {name: this.passedAssignment.name}, fragment: 'editing'});
  }

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }

}
