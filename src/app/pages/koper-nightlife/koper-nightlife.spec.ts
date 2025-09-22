import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoperNightlife } from './koper-nightlife';

describe('KoperNightlife', () => {
  let component: KoperNightlife;
  let fixture: ComponentFixture<KoperNightlife>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KoperNightlife]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoperNightlife);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
