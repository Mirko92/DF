import { TestBed, inject } from '@angular/core/testing';

import { DynamicFormLibService } from './dynamic-form-lib.service';

describe('DynamicFormLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormLibService]
    });
  });

  it('should be created', inject([DynamicFormLibService], (service: DynamicFormLibService) => {
    expect(service).toBeTruthy();
  }));
});
