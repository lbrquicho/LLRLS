import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadModuleComponent } from './upload-module.component';

describe('UploadModuleComponent', () => {
  let component: UploadModuleComponent;
  let fixture: ComponentFixture<UploadModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
