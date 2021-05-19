import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransaccionComponent } from './view-transaccion.component';

describe('ViewTransaccionComponent', () => {
  let component: ViewTransaccionComponent;
  let fixture: ComponentFixture<ViewTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
