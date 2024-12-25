import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeFormComponent } from './echange-form.component';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
describe('EchangeFormComponent', () => {
  let component: EchangeFormComponent;
  let fixture: ComponentFixture<EchangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [EchangeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form valid when empty', () => {
    expect(component.gptForm.valid).toBeFalsy();
  });

  it('message field validity', () => {
    let message = component?.gptForm?.controls['message'];
    expect(message.valid).toBeFalsy();
  });

  it('message field validity error', () => {
    let errors: any = {};
    let message = component.gptForm.controls['message'];
    errors = message.errors || {};
    expect(errors && errors['required']).toBeTruthy();
  });

  it('submitting a gptForm emits', () => {
    expect(component.gptForm.valid).toBeFalsy();
    component.gptForm.controls['message'].setValue('je test ce message');
    component.gptForm.controls['system'].setValue('123456789');
    expect(component.gptForm.valid).toBeTruthy();

    // Trigger the submit function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    component.gptForm.controls['message'].setValue('je test ce message');
    component.gptForm.controls['system'].setValue('123456789');
    expect(component.gptForm.valid).toBeTruthy();
  });
});
