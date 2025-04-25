import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormComponent } from './utilidades/components/form/form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,         // standalone, se importa
        FormComponent,        // standalone, se importa
        HttpClientTestingModule // para evitar el error de HttpClient
      ]
    }).compileComponents();
  });

  it('debería crearse correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debería mostrar la imagen animada', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img')?.getAttribute('src')).toContain('people.gif');
  });

  it('debería contener el componente app-form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-form')).toBeTruthy();
  });

  it('debería contener el título de bienvenida', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('¡Te damos la bienvenida a Banco Azteca!');
  });
});
