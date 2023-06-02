import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://64.226.85.227';

  constructor(private http: HttpClient) { }

  getRole(walletId: string) {
    const requestBody = {
      wallet_id: walletId,
    };

    return this.http.post(`${this.apiUrl}/get_role/`, requestBody);
  }

  getRandomWallets(): Observable<any> {
    const url = `${this.apiUrl}/random_wallets/`;
    return this.http.post(url, {});
  }
}
