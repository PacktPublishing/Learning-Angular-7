import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
  animations: [
    trigger('submission', [
      state('submitted', style({
        opacity: 0.5,
        color: 'green'
      })),
      state('unsubmitted', style({
        opacity: 1,
        color: 'red'
      })),
      transition('unsubmitted => submitted', [
        animate('1s')
      ]),
      transition('submitted => unsubmitted', [
        animate('3s')
      ])
    ]),
    trigger('confirmedSubmission', [
      state('submitted', style({
        backgroundColor: 'darkseagreen',
        width: '50%'
      })),
      state('unsubmitted', style({
        backgroundColor: 'mistyrose',
        width: '100%'
      })),
      transition('unsubmitted => submitted', [
        animate('1s', keyframes([
          style({width: '50%', offset: 0.2}),
          style({backgroundColor: 'darkseagreen', offset: 0.7})
        ]))
      ]),
      transition('submitted => unsubmitted', [
        animate('3s', keyframes([
          style({width: '100%', offset: 0.4}),
          style({backgroundColor: 'mistyrose', offset: 0.8})
        ]))
      ])
    ])
  ]
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
    if (this.passedAssignment.submitted === false) {

      this.passedAssignment.submitted = true;
    } else {
      this.passedAssignment.submitted = false;
    }

    this.assignmentsService.updateAssignments(this.passedAssignment)
      .subscribe(success => console.log(success));
  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.passedAssignment)
      .subscribe(res => this.router.navigate(['/home']));

  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.passedAssignment.id, 'edit'],
      {queryParams: {name: this.passedAssignment.name}, fragment: 'editing'});
  }

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }

}
