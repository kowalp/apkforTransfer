import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportsComponent } from './raports.component';

describe('RaportsComponent', () => {
  let component: RaportsComponent;
  let fixture: ComponentFixture<RaportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
