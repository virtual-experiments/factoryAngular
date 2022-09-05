import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigchangeComponent } from './configchange.component';

describe('ConfigchangeComponent', () => {
  let component: ConfigchangeComponent;
  let fixture: ComponentFixture<ConfigchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
