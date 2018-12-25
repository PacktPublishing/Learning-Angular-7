import {Component, OnInit} from '@angular/core';
import {Assignment} from './assignment.model';
import {AssignmentsService} from '../shared/assignments.service';
import {Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  formVisible = false;

  selectedAssignment: Assignment;

  assignments: Assignment[];

  submitted: Assignment[];
  unsubmitted: Assignment[];

  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAssignments();

    this.assignmentsService.getSubmitted()
      .subscribe(subAssignments => this.submitted = subAssignments);

    this.assignmentsService.getUnsubmitted()
      .subscribe(unsubAssignments => this.unsubmitted = unsubAssignments);
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }

  onAddBtnClick() {
    // this.formVisible = true;
    this.selectedAssignment = null;
  }

  setSelected(assignment: Assignment) {
    // this.selectedAssignment = assignment;

    this.router.navigate(['/assignment/' + assignment.id]);
  }


  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

}
