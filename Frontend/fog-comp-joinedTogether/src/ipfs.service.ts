import {Injectable} from "@angular/core";
import { create } from 'ipfs-http-client'

@Injectable()
export class IpfsService {
    private readonly ipfs: any;

    constructor() {
        this.ipfs = create({
          host: '127.0.0.1',
          port: 5002,
          protocol: 'http',
        })
    }

    async addFileToIPFS(): Promise<string> {
      const addedFile = await this.ipfs.add("TEST");
      return addedFile.cid.toString();
    }

    async getFile(cid: string): Promise<Buffer> {
        const chunks = [];
        for await (const chunk of this.ipfs.cat(cid)) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
}
