// Εργαλεία για unit tests Angular components.
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Το component που θέλουμε να δοκιμάσουμε.
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  // Το componentInstance είναι το πραγματικό instance της κλάσης μέσα στο test.
  let component: HomeComponent;
  // Το fixture μάς δίνει πρόσβαση στο component και στο rendered template του.
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    // Δημιουργεί ένα testing module και κάνει import το standalone component.
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    // Δημιουργεί το component μέσα στο test περιβάλλον.
    fixture = TestBed.createComponent(HomeComponent);
    // Παίρνει το instance της κλάσης HomeComponent.
    component = fixture.componentInstance;
    // Περιμένει να ολοκληρωθούν τυχόν async εργασίες πριν τρέξει το test.
    await fixture.whenStable();
  });

  it('should create', () => {
    // Ελέγχει ότι το component δημιουργήθηκε σωστά.
    expect(component).toBeTruthy();
  });
});
