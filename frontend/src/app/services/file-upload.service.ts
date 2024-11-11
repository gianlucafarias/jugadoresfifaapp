import { Injectable } from '@angular/core';
import { environment } from '../views/view-player/appSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT_Token') || ''}`,
    });

    return this.http.post(`${this.apiUrl}players/csv-import`, formData, { headers });
  }
}