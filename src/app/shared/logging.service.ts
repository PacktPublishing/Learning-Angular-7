import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(name, action) {
    console.log(name + ' has been ' + action);
  }
}
