import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCompanyComponent } from './product-company.component';

describe('ProductCompanyComponent', () => {
  let component: ProductCompanyComponent;
  let fixture: ComponentFixture<ProductCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
