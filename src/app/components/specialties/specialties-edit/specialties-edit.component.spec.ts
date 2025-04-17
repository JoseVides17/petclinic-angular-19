import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesEditComponent } from './specialties-edit.component';

describe('SpecialtiesEditComponent', () => {
  let component: SpecialtiesEditComponent;
  let fixture: ComponentFixture<SpecialtiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtiesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
