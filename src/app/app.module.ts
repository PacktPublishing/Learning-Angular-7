import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckbox, MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {AssignmentsComponent} from './assignments/assignments.component';
import {SubmittedDirective} from './shared/submitted.directive';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssignmentDetailComponent} from './assignments/assignment-detail/assignment-detail.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import {AssignmentsService} from './shared/assignments.service';
import {LoggingService} from './shared/logging.service';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    SubmittedDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [AssignmentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
