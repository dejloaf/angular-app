import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-global-error',
  standalone: false,
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.scss',
})
export class GlobalErrorComponent {
  constructor(public errorService: ErrorService) {}
}
