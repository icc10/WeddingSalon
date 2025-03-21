import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesPageComponent } from './companies-page.component';

describe('CompaniesPageComponent', () => {
  let component: CompaniesPageComponent;
  let fixture: ComponentFixture<CompaniesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
