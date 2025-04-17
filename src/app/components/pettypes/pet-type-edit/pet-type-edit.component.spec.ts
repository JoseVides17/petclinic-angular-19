import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTypeEditComponent } from './pet-type-edit.component';

describe('PetTypeEditComponent', () => {
  let component: PetTypeEditComponent;
  let fixture: ComponentFixture<PetTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetTypeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
