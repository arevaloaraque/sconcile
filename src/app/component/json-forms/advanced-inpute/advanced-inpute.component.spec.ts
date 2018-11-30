import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedInputeComponent } from './advanced-inpute.component';

describe('AdvancedInputeComponent', () => {
  let component: AdvancedInputeComponent;
  let fixture: ComponentFixture<AdvancedInputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedInputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedInputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
