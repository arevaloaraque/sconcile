import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedControlsComponent } from './extended-controls.component';

describe('ExtendedControlsComponent', () => {
  let component: ExtendedControlsComponent;
  let fixture: ComponentFixture<ExtendedControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
