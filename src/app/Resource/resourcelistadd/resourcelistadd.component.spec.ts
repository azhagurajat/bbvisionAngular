import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcelistaddComponent } from './resourcelistadd.component';

describe('ResourcelistaddComponent', () => {
  let component: ResourcelistaddComponent;
  let fixture: ComponentFixture<ResourcelistaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcelistaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcelistaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
