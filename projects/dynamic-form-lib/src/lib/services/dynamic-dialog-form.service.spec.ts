import { TestBed } from '@angular/core/testing';

import { DynamicDialogFormService } from './dynamic-dialog-form.service';

describe('DynamicDialogFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicDialogFormService = TestBed.get(DynamicDialogFormService);
    expect(service).toBeTruthy();
  });
});
