import { TestBed } from '@angular/core/testing';

import { MoodRepositoryService } from './mood-repository.service';

describe('MoodRepositoryService', () => {
  let service: MoodRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
