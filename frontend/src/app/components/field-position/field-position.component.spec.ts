import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPositionComponent } from './field-position.component';

describe('FieldPositionComponent', () => {
  let component: FieldPositionComponent;
  let fixture: ComponentFixture<FieldPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
