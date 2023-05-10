import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {JournalDTO} from "./journal.model";
import {JournalService} from "./journal.service";
import {IpfsService} from "../../ipfs.service";


@Controller('/journal')
export class JournalController {
    constructor(private journalService: JournalService, private ipfsService: IpfsService) {}

    @Get('/getJournal/:id')
    getJournal(@Param('id') id: string): JournalDTO {
        const journal = new JournalDTO();
        return journal;
    }

    @Get('/getJournalList')
    getJournalList(): JournalDTO[] {
        const journal = new JournalDTO();
        return [journal];
    }

    @Post('/mintJournal')
    async mintJournal(@Body() body: any, @Res() res) {
        try {
            const result = null; // await this.journalService.mintJournal(body.tokenUri);
            res.status(HttpStatus.CREATED).json(result);
        } catch {
            res.status(HttpStatus.BAD_REQUEST).json([]);
        }

    }

    @Get("/test")
    async test(){
        const res = await this.ipfsService.addFile();
        console.log(res);
    }
}
