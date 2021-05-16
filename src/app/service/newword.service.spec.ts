import { TestBed } from '@angular/core/testing';

import { NewwordService } from './newword.service';

describe('NewwordService', () => {
  let service: NewwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
