import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MessagesAdmin } from './messages-admin';

describe('MessagesAdmin', () => {
  let component: MessagesAdmin;
  let fixture: ComponentFixture<MessagesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesAdmin],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
