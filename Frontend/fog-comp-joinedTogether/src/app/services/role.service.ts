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

  getRole1(walletId: string): Promise<string> {
    const myHeaders = new Headers();
    let role : string | null = null;
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
      "wallet_id": walletId
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return new Promise<string>((resolve, reject) => {
      fetch("http://64.226.85.227:8000/get_role/", requestOptions)
        .then(response => response.text())
        .then(result => {
          const role = result;
          resolve(role);
        })
        .catch(error => reject(error));
    });
  
  }

  getRandomWallet(numOfWallets: number, role: string) {
    const url = `http://64.226.85.227:8000/get_random_wallets/?role=${role}&number=${numOfWallets}`;
    return this.http.get<any>(url);
  }
}
