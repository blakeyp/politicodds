import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

const root = 'api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(root + 'events').pipe(
      map(this.extractData))
  }

  private extractData(res: Response) {
    const body = res
    return body || []
  }
}
