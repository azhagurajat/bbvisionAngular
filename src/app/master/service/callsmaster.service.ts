import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CallsmsaterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  save(save: any): Promise<any> {
    const url = environment.API_URL + 'calls_master/calls_insert.php';
    return this.http.post(url, save, this.httpOptions).toPromise();
  }

  view(): Promise<any> {
    const url = environment.API_URL + 'calls_master/calls_view.php';
    return this.http.post(url, this.httpOptions).toPromise();
  }

  update(update: any): Promise<any> {
    const url = environment.API_URL + 'calls_master/calls_update.php';
    return this.http.post(url, update, this.httpOptions).toPromise();
  }
}
