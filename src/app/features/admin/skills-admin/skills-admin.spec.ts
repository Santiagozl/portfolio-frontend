import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SkillsAdmin } from './skills-admin';

describe('SkillsAdmin', () => {
  let component: SkillsAdmin;
  let fixture: ComponentFixture<SkillsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsAdmin],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
