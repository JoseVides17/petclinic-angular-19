import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitListComponent } from './visits-list.component';

describe('VisitsListComponent', () => {
  let component: VisitListComponent;
  let fixture: ComponentFixture<VisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
