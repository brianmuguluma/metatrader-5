import { TestBed } from '@angular/core/testing';

import { Oanda } from './oanda';

describe('Oanda', () => {
  let service: Oanda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oanda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
