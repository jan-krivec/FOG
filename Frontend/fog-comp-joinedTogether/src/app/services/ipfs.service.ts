import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private readonly ipfs: any;

  constructor() {}

  async addJSONtoIPFS(json: string): Promise<string> {
    try {
      const res = await fetch(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          method: 'POST',
          body: json,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + environment.PINATA_IPFS_JWT,
          },
        }
      );
      const data = await res.json();
      return 'https://gateway.pinata.cloud/ipfs/' + data.IpfsHash;
    } catch (error) {
      console.log(error);
    }

    return '';
  }

  async addFileToIPFS(journal: File): Promise<string> {
    try {
      const formData = new FormData();

      formData.append('file', journal);

      const metadata = JSON.stringify({
        name: journal.name,
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const res = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + environment.PINATA_IPFS_JWT,
          },
        }
      );
      const data = await res.json();
      return 'https://gateway.pinata.cloud/ipfs/' + data.IpfsHash;
    } catch (error) {
      console.log(error);
    }

    return '';
  }
}
