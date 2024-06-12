import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "./shared/services/auth.service";
import { Component, inject } from "@angular/core";
import { SignInComponent } from "./features/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./features/auth/sign-up/sign-up.component";
import { AboutComponent } from "./features/about/about.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SignInComponent,
    SignUpComponent,
    RouterOutlet,
    HeaderComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    AboutComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly authService = inject(AuthService);
  user$ = this.authService.user$;

  constructor() {
    this.authService.init();
  }
}
