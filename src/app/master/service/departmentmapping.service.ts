import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DepartmentmappingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) { }

  save(save: any): Promise<any> {
    const url = environment.API_URL + 'department_mapping/department_mapping_insert.php';
    return this.http.post(url, save, this.httpOptions).toPromise();
  }

  view(): Promise<any> {
    debugger;
    const url = environment.API_URL + 'department_mapping/department_mapping_view.php';
    return this.http.post(url, this.httpOptions).toPromise();
  }

  update(update: any): Promise<any> {
    const url = environment.API_URL + 'department_mapping_master/departmentmaster_mapping_update.php';
    return this.http.post(url, update, this.httpOptions).toPromise();
  }
}
