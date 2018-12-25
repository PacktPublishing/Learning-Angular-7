import {Injectable} from '@angular/core';
import {Assignment} from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
import {LoggingService} from './logging.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, filter, map, tap} from 'rxjs/internal/operators';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  url = 'http://localhost:8010/api/assignments';
  urlOne = 'http://localhost:8010/api/assignment';

  submitted = [];
  unsubmitted = [];

  assignments: Assignment[];

  constructor(private loggingService: LoggingService,
              private http: HttpClient) {
  }

  getAssignments(): Observable<Assignment[]> {
    // return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id: number): Observable<Assignment> {
    // return of(this.assignments.find(x => x.id === id));

    return this.http.get<Assignment>(this.urlOne + '/' + id)
      .pipe(
        tap(_ => console.log(`fetched assignment id=${id}`)),
        catchError(this.handleError<Assignment>(`getAssignment id=${id}`))
      );
  }

  getSubmitted() {
    const assignments = this.http.get<Assignment[]>(this.url);

    return assignments
      .pipe(map(
        arr =>
          arr.filter(a => a.submitted === true)));
  }

  getUnsubmitted() {
    const assignments = this.http.get<Assignment[]>(this.url);

    return assignments.pipe(map(arr =>
      arr.filter(a => a.submitted === false)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addAssignments(assignment: Assignment): Observable<any> {

    // assignment.id = this.assignments.length + 1;
    // this.assignments.push(assignment);
    //
    // this.loggingService.log(assignment.name, 'added');
    //
    // return of('assignment added!');

    return this.http.post<Assignment>(this.urlOne, assignment, this.httpOptions);
  }

  updateAssignments(assignment: Assignment): Observable<any> {

    return this.http.put<Assignment>(this.urlOne, assignment);
  }

  deleteAssignment(deletedAssignment: Assignment): Observable<any> {

    const newUrl = this.urlOne + '/' + deletedAssignment._id;

    return this.http.delete(newUrl);
  }
}
