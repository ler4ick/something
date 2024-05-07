import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCurrentComponent } from './chat-current.component';

describe('ChatCurrentComponent', () => {
  let component: ChatCurrentComponent;
  let fixture: ComponentFixture<ChatCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatCurrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
