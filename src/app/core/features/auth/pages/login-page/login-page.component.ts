import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';
import { ConfirmCreateUserDialog } from '../../components/confirm-create-user-dialog/confirm-create-user-dialog.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, MatDialogModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onLogin(email: string): void {
    this.authService.login(email).subscribe(user => {
      if (user) {
        this.setUserAndNavigate(user);
      } else {
        const dialogRef = this.dialog.open(ConfirmCreateUserDialog);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.authService.createUser(email).subscribe(() => {
              this.setUserAndNavigate(user);
            });
          }
        });
      }
    });
  }

  setUserAndNavigate(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/tasks']);
  }
}
