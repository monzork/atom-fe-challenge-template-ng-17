import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'confirm-create-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Usuario no encontrado</h2>
    <mat-dialog-content>¿Deseas crear un nuevo usuario con este correo?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]=false>Cancelar</button>
      <button mat-button color="primary" [mat-dialog-close]=true>Crear</button>
    </mat-dialog-actions>
  `
})
export class ConfirmCreateUserDialog { }
