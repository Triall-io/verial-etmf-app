import { TestBed, inject } from '@angular/core/testing';

import { BlockchainProofService } from './blockchain-proof.service';
import {BlockchainService} from './api';

describe('BlockchainProofService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockchainProofService]
    });
  });

  it('should be created', inject([BlockchainProofService], (service: BlockchainProofService) => {
    expect(service).toBeTruthy();
  }));
});
