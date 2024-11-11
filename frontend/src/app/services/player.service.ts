import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:3001/api/players';
  
  constructor(private http: HttpClient) {}


  getPlayers(filters: any = {}, page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
  
    if (filters.nombre) {
      params = params.set('nombre', filters.nombre);
    }
    if (filters.nacionalidad) {
      params = params.set('nacionalidad', filters.nacionalidad);
    }
    if (filters.club) {
      params = params.set('club', filters.club);
    }
    if (filters.posicion) {
      params = params.set('posicion', filters.posicion);
    }
    if (filters.fifa_version) {
      params = params.set('fifa_version', filters.fifa_version);
    }
  
    return this.http.get<Player>(this.apiUrl, { params });
  }

  getPlayerById(id: number, fifa_version: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}?fifa_version=${fifa_version}`);
  }

  createPlayer(player: any): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/new-player`, player);
  }

updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  csvImport(playerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/csv-import`, { playerData });
  }

  uploadImage(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}players/upload-image/${id}`, {image: File});
  }
}
