import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpadderComponent } from './expadder.component';

describe('ExpadderComponent', () => {
  let component: ExpadderComponent;
  let fixture: ComponentFixture<ExpadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpadderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
