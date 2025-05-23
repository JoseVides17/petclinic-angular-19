import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAddComponent } from './visit-add.component';

describe('VisitAddComponent', () => {
  let component: VisitAddComponent;
  let fixture: ComponentFixture<VisitAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
