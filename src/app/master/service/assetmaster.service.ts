import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssetmasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  save(save: any): Promise<any> {
    const url = environment.API_URL + 'asset_master/asset_insert.php';
    return this.http.post(url, save, this.httpOptions).toPromise();
  }

  view(): Promise<any> {
    const url = environment.API_URL + 'asset_master/asset_view.php';
    return this.http.post(url, this.httpOptions).toPromise();
  }

  update(update: any): Promise<any> {
    const url = environment.API_URL + 'asset_master/asset_update.php';
    return this.http.post(url, update, this.httpOptions).toPromise();
  }
}
