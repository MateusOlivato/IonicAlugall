import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagProdutoPage } from './pag-produto.page';

describe('PagProdutoPage', () => {
  let component: PagProdutoPage;
  let fixture: ComponentFixture<PagProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagProdutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
