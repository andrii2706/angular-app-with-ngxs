import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Service()
export class ErrorService {
  requestError = new BehaviorSubject<boolean>(false);
  private requestError$: Observable<boolean> = this.requestError.asObservable();

  fullErrorObject(status: boolean) {
    this.requestError.next(status);
  }
}
