import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasByAdminComponent } from './ligas-by-admin.component';

describe('LigasByAdminComponent', () => {
  let component: LigasByAdminComponent;
  let fixture: ComponentFixture<LigasByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigasByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigasByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
