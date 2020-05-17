import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { SubnetResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubnetService {
  private blueAllyApiUrl: string = environment.blueAllyApiUrl;
  
  constructor(private http: HttpClient) {}
  
  getSubnets(): Observable<SubnetResponse> {
    return this.http.get<SubnetResponse>(this.blueAllyApiUrl);    
  }
}
