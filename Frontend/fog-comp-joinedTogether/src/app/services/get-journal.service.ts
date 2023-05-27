import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalDTO } from '../interfaces/JournalDTO';

@Injectable({
  providedIn: 'root'
})
export class GetJournalService {

  constructor(private http: HttpClient) { }

  getJournal(data: any): Observable<JournalDTO> {
    let url = 'http://localhost:8080/getJournal/${id}';
    return this.http.get<JournalDTO>(url);
  }

  getJournalList(): Observable<JournalDTO[]> {
    let url = 'http://localhost:8080/getJournalList';
    return this.http.get<JournalDTO[]>(url);
  }

  mintJournal(requestBody: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/mintJournal', requestBody);
  }

}
