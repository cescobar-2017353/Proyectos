import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBranchComponent } from './product-branch.component';

describe('ProductBranchComponent', () => {
  let component: ProductBranchComponent;
  let fixture: ComponentFixture<ProductBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
