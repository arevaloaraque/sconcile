import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputesGridComponent } from './inputes-grid.component';

describe('InputesGridComponent', () => {
  let component: InputesGridComponent;
  let fixture: ComponentFixture<InputesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
