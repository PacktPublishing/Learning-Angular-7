import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckbox, MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSlideToggleModule,
  MatSnackBarModule, MatStepperModule, MatTabsModule
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
import {RouterModule, Routes} from '@angular/router';
import {EditAssignmentComponent} from './assignments/assignment-detail/edit-assignment/edit-assignment.component';
import {AuthGuard} from './shared/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { SnackbarComponent } from './snackbar/snackbar.component';

const routes: Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {path: 'assignment/:id', component: AssignmentDetailComponent},
  {
    path: 'assignment/:id/edit',
    canActivate: [AuthGuard],
    component: EditAssignmentComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    SubmittedDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    SnackbarComponent
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
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    HttpClientModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  entryComponents: [
    SnackbarComponent
  ],
  providers: [AssignmentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
