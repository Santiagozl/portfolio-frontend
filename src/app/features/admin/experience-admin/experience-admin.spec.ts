import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ExperienceAdmin } from './experience-admin';

describe('ExperienceAdmin', () => {
  let component: ExperienceAdmin;
  let fixture: ComponentFixture<ExperienceAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceAdmin],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
