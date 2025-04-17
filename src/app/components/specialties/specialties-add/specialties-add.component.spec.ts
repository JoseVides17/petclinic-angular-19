import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesAddComponent } from './specialties-add.component';

describe('SpecialtiesAddComponent', () => {
  let component: SpecialtiesAddComponent;
  let fixture: ComponentFixture<SpecialtiesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtiesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtiesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
