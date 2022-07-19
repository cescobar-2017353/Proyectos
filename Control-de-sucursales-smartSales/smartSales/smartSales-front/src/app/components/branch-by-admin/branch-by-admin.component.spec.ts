import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchByAdminComponent } from './branch-by-admin.component';

describe('BranchByAdminComponent', () => {
  let component: BranchByAdminComponent;
  let fixture: ComponentFixture<BranchByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
