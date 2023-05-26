import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client'

@Injectable()
export class IpfsService {
    private readonly ipfs: any;

    constructor() {
        this.ipfs = create({ url: "http://127.0.0.1:5002/" }); // Create IPFS client
    }

    async addFile(): Promise<string> {
        const { cid } = await this.ipfs.add("data"); // Add file to IPFS and get CID
        return cid.toString();
    }

    async getFile(cid: string): Promise<Buffer> {
        const chunks = [];
        for await (const chunk of this.ipfs.cat(cid)) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
}