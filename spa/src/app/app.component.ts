import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FontAwesomeModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrophy);
  }
}
