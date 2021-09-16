import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsheetaddComponent } from './costsheetadd.component';

describe('CostsheetaddComponent', () => {
  let component: CostsheetaddComponent;
  let fixture: ComponentFixture<CostsheetaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsheetaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsheetaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
