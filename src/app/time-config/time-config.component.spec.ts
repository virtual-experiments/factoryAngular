import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConfigComponent } from './time-config.component';

describe('TimeConfigComponent', () => {
  let component: TimeConfigComponent;
  let fixture: ComponentFixture<TimeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
