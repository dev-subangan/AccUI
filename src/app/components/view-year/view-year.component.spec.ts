import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYearComponent } from './view-year.component';

describe('ViewYearComponent', () => {
  let component: ViewYearComponent;
  let fixture: ComponentFixture<ViewYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
