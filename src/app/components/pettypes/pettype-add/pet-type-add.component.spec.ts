import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PettypeAddComponent } from './pet-type-add.component';


describe('PetAddComponent', () => {
  let component: PettypeAddComponent;
  let fixture: ComponentFixture<PettypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PettypeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
