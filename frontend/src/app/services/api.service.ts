import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    name: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStartData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/start`);
  }
}
