import { TestBed, inject } from '@angular/core/testing';

import { BlockchainFactomService } from './blockchain-factom.service';

describe('BlockchainFactomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockchainFactomService]
    });
  });

  it('should be created', inject([BlockchainFactomService], (service: BlockchainFactomService) => {
    expect(service).toBeTruthy();
  }));
});
