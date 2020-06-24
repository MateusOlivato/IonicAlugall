import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlugarPage } from './alugar.page';

describe('AlugarPage', () => {
  let component: AlugarPage;
  let fixture: ComponentFixture<AlugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
