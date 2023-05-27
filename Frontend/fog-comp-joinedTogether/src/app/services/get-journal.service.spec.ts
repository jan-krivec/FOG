import { TestBed } from '@angular/core/testing';

import { GetJournalService } from './get-journal.service';

describe('GetJournalService', () => {
  let service: GetJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
