import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { LoggedGuard } from './Logged.guard';

describe('loggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => LoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
