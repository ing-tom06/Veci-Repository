import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolunteerLayoutComponent } from './volunteer-layout.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VolunteerLayoutComponent', () => {
  let component: VolunteerLayoutComponent;
  let fixture: ComponentFixture<VolunteerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VolunteerLayoutComponent,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolunteerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente correctamente (Prueba de Inyección)', () => {
    expect(component).toBeTruthy();
  });
});
