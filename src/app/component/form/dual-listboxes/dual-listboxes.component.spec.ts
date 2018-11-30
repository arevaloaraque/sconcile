import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualListboxesComponent } from './dual-listboxes.component';

describe('DualListboxesComponent', () => {
  let component: DualListboxesComponent;
  let fixture: ComponentFixture<DualListboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualListboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualListboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
