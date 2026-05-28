import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('AppComponent (Prueba General de Carga)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como es un componente Standalone, se importa en lugar de declararse
      imports: [AppComponent],
      providers: [
        // Proveemos las dependencias reales/mockeadas para evitar errores de inyección
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Simulamos las rutas vacías para la prueba
      ]
    }).compileComponents();
  });

  it('1. El módulo principal debe cargar correctamente (AppComponent creado)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('2. No deben existir errores de inyección de dependencias (HttpClient y Router disponibles)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // Si llegamos aquí sin errores, las dependencias se inyectaron correctamente
    expect(fixture).toBeDefined();
  });

  it(`3. Debe tener el título del proyecto configurado como 'Veci'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Veci');
  });

  it('4. Debe renderizar el punto de entrada de rutas (router-outlet)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Verificamos que el router-outlet esté presente en el HTML renderizado
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
