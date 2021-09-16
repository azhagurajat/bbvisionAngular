import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsheetreverseComponent } from './costsheetreverse.component';

describe('CostsheetreverseComponent', () => {
  let component: CostsheetreverseComponent;
  let fixture: ComponentFixture<CostsheetreverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsheetreverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsheetreverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
