import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectsAdmin } from './projects-admin';

describe('ProjectsAdmin', () => {
  let component: ProjectsAdmin;
  let fixture: ComponentFixture<ProjectsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAdmin],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
