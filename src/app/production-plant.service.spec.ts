import { TestBed } from '@angular/core/testing';

import { ProductionPlantService } from './production-plant.service';

describe('ProductionPlantService', () => {
  let service: ProductionPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
