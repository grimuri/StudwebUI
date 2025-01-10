import { Component, inject} from '@angular/core';
import { User } from '../../authentication/model/user';
import { AuthenticationService } from '../../authentication/data-access/authentication.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  authService = inject(AuthenticationService);

  user: User | null = null;

  constructor() {
    this.user = this.authService.currentUserSig();
  }
}
