import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsheetComponent } from './costsheet.component';

describe('CostsheetComponent', () => {
  let component: CostsheetComponent;
  let fixture: ComponentFixture<CostsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
